<template>
  <popup-area :sizeSM="`12`" :sizeMD="`10`" :sizeLG="`5`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Create Batch</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <VeeForm id="new-bacth-form" @submit="submit" :validation-schema="validationSchema">
        <v-row>
          <v-col class="custom-field" cols="12" sm="12" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Batch Name</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="name" type="text" placeholder="Enter Batch Name" />
            </v-col>
            <ErrorMessage name="name" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Ticket Start Date</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="dateFrom" type="date" placeholder="Select Date" />
            </v-col>
            <ErrorMessage name="dateFrom" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Ticket End Date</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="dateTo" type="date" placeholder="Select Date" />
            </v-col>
            <ErrorMessage name="dateTo" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="12">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Notes</label></v-col>
            <v-col class="field-type pa-0">
              <Field v-slot="{ field }" name="notes">
                <textarea v-bind="field" rows="4" />
              </Field>
            </v-col>
            <ErrorMessage name="notes" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="12">
            <v-col class="drop-image pa-0">
              <v-col v-if="selectedFileName" class="selected-file-name">
                {{ selectedFileName }}
              </v-col>
              <v-col v-if="isUploading" class="text-center"
                ><v-progress-circular :width="3" color="green" indeterminate></v-progress-circular
              ></v-col>

              <label class="d-flex flex-wrap pt-6 pb-6" @dragover.prevent @drop="handleFileDrop">
                <Field
                  name="SpreadsheetFile"
                  type="file"
                  @change="handleFileChange($event)"
                  v-model="formData.SpreadsheetFile"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <v-col cols="12" class="pa-0 text-center mb-2"
                  ><img src="@/assets/ticket-it/images/upload.svg" alt="upload"
                /></v-col>
                <v-col cols="12" class="pa-0 text-center upload-label mb-2"
                  >Drag & Drop to Upload File <br />
                  OR</v-col
                >
                <v-col cols="12" class="pa-0 d-flex justify-center"
                  ><span class="blank_cta">Browse File</span></v-col
                >
              </label>
            </v-col>
            <ErrorMessage name="SpreadsheetFile" />
          </v-col>
        </v-row>
        <v-col class="pa-0 mt-5">
          <button-with-icon class="green-bg"
            ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
            <p>Save</p></button-with-icon
          >
        </v-col>
      </VeeForm>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { validationSchema } from '@/core/ticket-it/validations/CreateBatch.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'create-batch',
  components: {
    'popup-area': Popover,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup(props, { emit }) {
    const loader = ref(false)
    const store = useStore()
    const toast = useToast()
    const isUploading = ref(false)
    const selectedFileName = ref('')
    const formData = ref({
      SpreadsheetFile: ''
    })

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const createBatch = computed(() => {
      return store.getters.createBatchSuccess
    })

    // Upload file spreadhsset
    const handleFileChangeAndDrop = (event, isDropEvent = false) => {
      event.preventDefault()
      const fileData = isDropEvent ? event.dataTransfer.files[0] : event.target.files[0]
      if (fileData) {
        isUploading.value = true
        try {
          const allowedFormats = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            '.csv'
          ]
          if (allowedFormats.includes(fileData.type)) {
            formData.value.SpreadsheetFile = fileData
            selectedFileName.value = fileData.name
            event.target.value = ''
          } else {
            event.target.value = ''
            formData.value.SpreadsheetFile = ''
            alert('Invalid file format. Please select a spreadsheet file (CSV, Excel)')
          }
        } finally {
          isUploading.value = false
        }
      }
    }

    const handleFileChange = (event) => {
      handleFileChangeAndDrop(event, false)
    }
    const handleFileDrop = (event) => {
      handleFileChangeAndDrop(event, true)
    }

    const submit = async (values, { resetForm }) => {
      loader.value = true
      if (values.notes === undefined) {
        values.notes = ''
      }
      const sendFile = new FormData()
      for (const key in values) {
        if (key !== 'SpreadsheetFile') {
          sendFile.append(key, values[key])
        }
      }
      sendFile.append('SpreadsheetFile', formData.value.SpreadsheetFile)

      await store.dispatch(Actions.CREATE_BATCH, sendFile)
      resetForm()
      selectedFileName.value = ''
    }

    watch(errorBatch, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(createBatch, (newValue) => {
      if (newValue) {
        loader.value = false
        emit('closeModal')
        emit('fetchLatestBatches')
        toast.success(createBatch.value.successMessage, {
          position: 'top-right'
        })
      }
    })

    return {
      validationSchema,
      submit,
      handleFileChange,
      selectedFileName,
      formData,
      isUploading,
      handleFileDrop,
      loader
    }
  }
})
</script>
