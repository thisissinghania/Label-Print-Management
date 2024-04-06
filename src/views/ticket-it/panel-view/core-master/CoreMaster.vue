<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <navigation-bar />

    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12">
          <v-col class="pa-0 subpage-title">Core Tickets Details</v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="pa-md-5 core_master">
      <v-col class="shadow_block">
        <v-row>
          <!-- left part -->
          <v-col cols="12" sm="12" md="6" class="pa-md-7 border-bottom">
            <ul class="master_detail" v-if="coreListData?.data">
              <li>
                <span>Description</span>
                <p>{{ coreListData?.data?.fileDescription }}</p>
              </li>
              <li>
                <span>Date Created</span>
                <p>{{ formatDate(coreListData?.data?.dateChanged) }}</p>
              </li>
              <li>
                <span>File Name</span>
                <p>
                  {{ coreListData?.data?.fileName }}
                  <router-link
                    v-if="coreListData?.data?.coreFilePath"
                    :to="coreListData?.data?.coreFilePath"
                    target="_blank"
                    class="normal-download-text"
                    download
                    >Download</router-link
                  >
                </p>
              </li>
              <li>
                <span>Status</span>
                <p v-if="coreListData?.data?.status == 0">Uploaded</p>
                <p v-if="coreListData?.data?.status == 1">Processing</p>
                <p v-if="coreListData?.data?.status == 2">UpToDate</p>
                <p v-if="coreListData?.data?.status == 3">Failed</p>
                <p v-if="coreListData?.data?.status == 4">WebFailed</p>
              </li>
              <li>
                <span>Update type</span>
                <p v-if="coreListData?.data?.isUpdateOnly == true">Update</p>
                <p v-else>Replace</p>
              </li>
            </ul>

            <v-col class="pa-0" v-else>
              <v-col class="no-batch pa-5 text-center" v-if="showBatchLoading">
                <v-progress-circular :width="4" color="green" indeterminate></v-progress-circular>
                <p class="mt-4">Please Wait...</p>
              </v-col>
              <v-col class="no-batch pa-5 text-center" v-else>
                <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
                <p>No Data Available</p>
              </v-col>
            </v-col>
          </v-col>

          <!-- right part -->
          <v-col cols="12" sm="12" md="6" class="pa-md-7 border-left border-bottom">
            <v-col class="pa-0 subpage-title">Core Setting</v-col>
            <v-col class="pa-0 mb-3 mt-1 content"
              ><p>You can change the core update type to:</p></v-col
            >
            <ul class="master_detail mb-5">
              <li>
                <span>1: Updates:</span>
                <p>
                  Updates existing product data and new products if required. If a product is in the
                  database that doesn't exist in the imported excel file, it isn't delete from the
                  system.
                </p>
              </li>
              <li>
                <span>2: Replace:</span>
                <p>All product data is cleared and all product are imported from the file.</p>
              </li>
            </ul>
            <fill-button
              class="small-font-cta green-bg"
              @click="changeToUpdate(coreListData?.data?.id)"
              ><span v-if="coreListData?.data?.isUpdateOnly == true">Change To Replace</span>
              <span v-else>Change to update</span></fill-button
            >
          </v-col>

          <v-col cols="12" class="pa-md-5">
            <v-col class="pa-0 subpage-title mb-3">Upload Core Tickets</v-col>
            <VeeForm id="core-form">
              <v-col class="custom-field pa-0" cols="12">
                <v-col class="field-type pa-0">
                  <Field
                    name="description"
                    type="text"
                    placeholder="Description"
                    v-model="formData.description"
                  />
                </v-col>
              </v-col>
              <v-col
                class="custom-field rounded green-bg mt-4"
                cols="12"
                v-if="formData?.description"
              >
                <Field
                  name="SpreadsheetFile"
                  type="file"
                  @change="handleFileChange($event)"
                  v-model="formData.SpreadsheetFile"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </v-col>
            </VeeForm>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-col>
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { Form as VeeForm, Field } from 'vee-validate'
import NavigationBar from '@/components/ticket-it/navigations/NavigationBar.vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'
import { getUserData } from '@/core/ticket-it/services/JWTService'
import { formatDate } from '@/core/ticket-it/global/Utils.js'

export default defineComponent({
  name: 'core-master',
  components: {
    'navigation-bar': NavigationBar,
    'fill-button': FillButton,
    'page-loader': PageLoader,
    VeeForm,
    Field
  },
  setup() {
    const showBatchLoading = ref(true)
    const UserDepartments = getUserData()?.UserDepartments
    const parsedDepartments = JSON.parse(UserDepartments)
    const loader = ref(false)
    const store = useStore()
    const toast = useToast()
    const formData = ref({
      description: '',
      SpreadsheetFile: ''
    })

    const errorCore = computed(() => {
      return store.getters.errorCoreMaster
    })
    const coreToggleUpdate = computed(() => {
      return store.getters.coreToggleUpdateSuccess
    })
    const coreFileUpload = computed(() => {
      return store.getters.coreFileUploadSuccess
    })
    const coreListData = computed(() => {
      return store.getters.coreListDataSuccess
    })

    const fetchCoreData = async () => {
      await store.dispatch(Actions.CORE_LIST_DATA, {
        url: parsedDepartments[0]?.DepartmentName
      })
      setTimeout(() => {
        showBatchLoading.value = false
      }, 5000)
    }

    const changeToUpdate = async (event) => {
      loader.value = true
      await store.dispatch(Actions.CORE_TOGGLE_UPDATE, event)
      fetchCoreData()
    }

    const handleFileChange = async (event) => {
      const fileData = event.target.files[0]
      if (fileData) {
        try {
          const allowedFormats = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            '.csv'
          ]
          if (allowedFormats.includes(fileData.type)) {
            formData.value.SpreadsheetFile = fileData
            const formDataToSend = new FormData()
            formDataToSend.append('description', formData.value.description)
            formDataToSend.append('UploadedFile', formData.value.SpreadsheetFile)

            // Dispatch the action with the form data
            loader.value = true
            await store.dispatch(Actions.CORE_FILE_UPLOAD, {
              url: parsedDepartments[0]?.DepartmentName,
              formData: formDataToSend
            })
            fetchCoreData()
          } else {
            event.target.value = ''
            formData.value.SpreadsheetFile = ''
            alert('Invalid file format. Please select a spreadsheet file (CSV, Excel)')
          }
        } catch (error) {
          console.error('Error handling file change:', error)
        }
      }
    }

    // fetch core list api
    fetchCoreData()

    watch(errorCore, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.error(errorCore.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(coreToggleUpdate, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.success(coreToggleUpdate.value.successMessage, {
          position: 'top-right'
        })
      }
    })
    watch(coreFileUpload, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        formData.value.description = ''
        formData.value.SpreadsheetFile = ''
        toast.success(coreFileUpload.value.successMessage, {
          position: 'top-right'
        })
      }
    })

    return {
      changeToUpdate,
      loader,
      formData,
      handleFileChange,
      parsedDepartments,
      coreListData,
      formatDate,
      showBatchLoading
    }
  }
})
</script>
