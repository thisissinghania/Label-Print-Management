<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <navigation-bar />

    <v-col class="pt-6 pb-6 single-title">Send Notification</v-col>

    <!-- batch listing start -->
    <v-col class="pt-0 pending-publish" v-if="singleBatch?.data">
      <v-col class="single_batch_list pa-0 mb-5 mb-sm-7">
        <send-notification-data :batchListData="singleBatch?.data" />
      </v-col>
    </v-col>
    <!-- batch listing end -->

    <v-col v-else>
      <v-col class="no-batch pa-5 text-center" v-if="showBatchLoading">
        <v-progress-circular :width="4" color="green" indeterminate></v-progress-circular>
        <p class="mt-4">Please Wait...</p>
      </v-col>
      <v-col class="no-batch pa-5 text-center" v-else>
        <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
        <p>No Batch Available</p>
      </v-col>
    </v-col>

    <v-col class="pt-0 pb-0">
      <v-col class="shadow-block pa-1">
        <VeeForm id="publish-batch-form" @submit="submit" :validation-schema="validationSchema">
          <v-row>
            <v-col cols="12" sm="6">
              <v-col class="custom-field d-flex" cols="12">
                <v-col class="pa-0" v-if="userStatus">
                  <v-col class="pa-0 mb-1 field-label bold-label"><label>Users</label></v-col>
                  <v-col class="pa-0 field-multi-select position-relative">
                    <Field name="clientLoginNames" v-slot="{ fieldUser }" v-model="selectedLogins">
                      <v-select
                        v-bind="fieldUser"
                        v-model="selectedLogins"
                        :items="allLogins?.data"
                        label="Select Users"
                        multiple
                        :disabled="allLogins?.data?.length == 0"
                      >
                        <template #prepend-item>
                          <v-list-item title="All Users" @click="addAllLogins">
                            <template #prepend>
                              <v-checkbox-btn></v-checkbox-btn>
                            </template>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>
                      </v-select>
                    </Field>
                    <p v-if="allLogins?.data?.length == 0" class="no-data-multiselect">
                      No User Available
                    </p>
                  </v-col>
                  <ErrorMessage name="clientLoginNames" />
                </v-col>
                <v-col class="pa-0" v-else>
                  <v-col class="pa-0 mb-1 field-label bold-label"><label>Regions</label></v-col>
                  <v-col class="pa-0 field-multi-select position-relative">
                    <Field name="regionNames" v-slot="{ fieldReg }" v-model="selectedRegions">
                      <v-select
                        v-bind="fieldReg"
                        v-model="selectedRegions"
                        :items="allRegions?.data"
                        label="Select Regions"
                        multiple
                        :disabled="allRegions?.data?.length == 0"
                      >
                        <template #prepend-item>
                          <v-list-item title="All Region" @click="addAllRegion">
                            <template #prepend>
                              <v-checkbox-btn></v-checkbox-btn>
                            </template>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>
                      </v-select>
                    </Field>
                    <p v-if="allRegions?.data?.length == 0" class="no-data-multiselect">
                      No Region Available
                    </p>
                  </v-col>
                  <ErrorMessage name="regionNames" />
                </v-col>
                <fill-button
                  @click="showUsers()"
                  type="button"
                  class="small-font-cta green-bg ms-5 mt-6"
                >
                  <span v-if="userStatus">Select Region</span>
                  <span v-else>Select Specific User's</span>
                </fill-button>
              </v-col>

              <v-col class="custom-field" cols="12" v-if="allTags?.data?.length > 0">
                <v-col class="pa-0 mb-1 field-label bold-label"><label>Tags</label></v-col>
                <v-col class="pa-0 field-multi-select">
                  <Field name="tagsList" v-slot="{ fieldTag }" v-model="selectedTags">
                    <v-select
                      v-bind="fieldTag"
                      v-model="selectedTags"
                      :items="allTags?.data"
                      label="Select Tags"
                      multiple
                    >
                      <template #prepend-item>
                        <v-list-item title="All Tags" @click="addAllTags">
                          <template #prepend>
                            <v-checkbox-btn></v-checkbox-btn>
                          </template>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
                      </template>
                    </v-select>
                  </Field>
                </v-col>
                <ErrorMessage name="tagsList" />
              </v-col>

              <v-col class="custom-field" cols="12" v-if="allCategories?.data?.length > 0">
                <v-col class="pa-0 mb-1 field-label bold-label"><label>Categories</label></v-col>
                <v-col class="pa-0 field-multi-select">
                  <Field
                    name="categoryList"
                    v-slot="{ fieldCategory }"
                    v-model="selectedCategories"
                  >
                    <v-select
                      v-bind="fieldCategory"
                      v-model="selectedCategories"
                      :items="allCategories?.data"
                      label="Select Categories"
                      multiple
                    >
                      <template #prepend-item>
                        <v-list-item title="All Categories" @click="addAllCategories">
                          <template #prepend>
                            <v-checkbox-btn></v-checkbox-btn>
                          </template>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
                      </template>
                    </v-select>
                  </Field>
                </v-col>
                <ErrorMessage name="categoryList" />
              </v-col>

              <v-col class="custom-field" cols="12">
                <v-col class="pa-0 mb-1 field-label bold-label"><label>Subject</label></v-col>
                <v-col class="field-type pa-0">
                  <Field
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    v-model="formVal.subject"
                  />
                </v-col>
                <ErrorMessage name="subject" />
              </v-col>
              <v-col class="custom-field" cols="12">
                <v-col class="pa-0 mb-1 field-label bold-label"><label>Publish Date</label></v-col>
                <v-col class="field-type pa-0">
                  <Field
                    name="publishDate"
                    type="date"
                    placeholder="Select Date"
                    v-model="formVal.publishDate"
                  />
                </v-col>
                <ErrorMessage name="publishDate" />
              </v-col>
            </v-col>

            <v-col cols="12" sm="6">
              <v-col class="custom-field" cols="12">
                <v-col class="pa-0 mb-1 field-label bold-label"><label>Message</label></v-col>
                <v-col class="field-type pa-0">
                  <Field v-slot="{ field }" name="body" v-model="emailTemplate.data">
                    <textarea rows="15" v-bind="field"></textarea>
                  </Field>
                </v-col>
                <ErrorMessage name="body" />
              </v-col>
            </v-col>

            <v-col cols="12" class="pt-0">
              <v-col class="pt-0 d-flex">
                <router-link
                  :to="`${TICKET_IT}/latest-batches`"
                  class="custom_fill_cta small-font-cta dark-primary mr-3 px-5"
                >
                  Back</router-link
                >
                <button-with-icon class="green-bg"
                  ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
                  <p>Publish</p></button-with-icon
                >
              </v-col>
            </v-col>
          </v-row>
        </VeeForm>
      </v-col>
    </v-col>
  </v-col>
</template>

<script>
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { defineComponent, computed, watch, ref } from 'vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import NavigationBar from '@/components/ticket-it/navigations/NavigationBar.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { validationSchema } from '@/core/ticket-it/validations/NewBatch.js'
import SendNotificationData from '@/views/ticket-it/panel-view/send-notification/SendNotificationData.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { formatNormalDate } from '@/core/ticket-it/global/Utils.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'send-notification',
  components: {
    'navigation-bar': NavigationBar,
    'button-with-icon': ButtonWithIcon,
    'send-notification-data': SendNotificationData,
    'fill-button': FillButton,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup() {
    const loader = ref(false)
    const router = useRouter()
    const store = useStore()
    const toast = useToast()
    const showBatchLoading = ref(true)
    const userStatus = ref(false)
    const selectedRegions = ref([])
    const selectedTags = ref([])
    const selectedCategories = ref([])
    const selectedLogins = ref([])

    const formVal = ref({
      publishDate: formatNormalDate(new Date()),
      subject: ''
    })

    const errorNotification = computed(() => {
      return store.getters.errorNotification
    })
    const singleBatch = computed(() => {
      return store.getters.singleBatchSuccess
    })
    const allRegions = computed(() => {
      return store.getters.allRegionsSuccess
    })
    const allTags = computed(() => {
      return store.getters.allTagsSuccess
    })
    const allCategories = computed(() => {
      return store.getters.allCategoriesSuccess
    })
    const allLogins = computed(() => {
      return store.getters.allLoginsSuccess
    })
    const emailTemplate = computed(() => {
      return store.getters.emailTemplateSuccess
    })
    const sendBatchNotification = computed(() => {
      return store.getters.sendBatchNotificationSuccess
    })

    const checkAllRegion = computed(
      () => selectedRegions.value?.length === allRegions.value?.data?.length
    )
    const addAllRegion = () => {
      if (checkAllRegion.value) {
        selectedRegions.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        selectedRegions.value = [...allRegions.value?.data]
      }
    }

    const checkAllTags = computed(() => selectedTags.value?.length === allTags.value?.data?.length)
    const addAllTags = () => {
      if (checkAllTags.value) {
        selectedTags.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        selectedTags.value = [...allTags.value?.data]
      }
    }

    const checkAllCategories = computed(
      () => selectedCategories.value?.length === allCategories.value?.data?.length
    )
    const addAllCategories = () => {
      if (checkAllCategories.value) {
        selectedCategories.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        selectedCategories.value = [...allCategories.value?.data]
      }
    }

    const checkAllLogins = computed(
      () => selectedLogins.value?.length === allLogins.value?.data?.length
    )
    const addAllLogins = () => {
      if (checkAllLogins.value) {
        selectedLogins.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        selectedLogins.value = [...allLogins.value?.data]
      }
    }

    const showUsers = () => {
      userStatus.value = !userStatus.value
      selectedRegions.value = []
      selectedLogins.value = []
    }

    const fetchAllLists = async () => {
      const params = new URLSearchParams(window.location.search).get('batchId')
      await store.dispatch(Actions.ALL_REGIONS)
      await store.dispatch(Actions.ALL_TAGS)
      await store.dispatch(Actions.ALL_CATEGORIES)
      await store.dispatch(Actions.ALL_LOGINS, allRegions.value?.data)
      await store.dispatch(Actions.EMAIL_TEMPLATE, params)
    }

    const fetchSingleBatch = async () => {
      const params = new URLSearchParams(window.location.search).get('batchId')
      await store.dispatch(Actions.SINGLE_BATCH, params)

      setTimeout(() => {
        showBatchLoading.value = false
      }, 5000)
    }

    const submit = async (values) => {
      loader.value = true
      const params = new URLSearchParams(window.location.search).get('batchId')
      const formData = {
        ...values,
        clientLoginNames: selectedLogins.value || ['0'],
        regionNames: selectedRegions.value || ['0'],
        tagsList: selectedTags.value || ['0'],
        categoryList: selectedCategories.value || ['0'],
        emailList: [],
        batchId: params,
        sendTime: new Date(),
        retryAttempts: 0,
        lastErrorMessage: null
      }
      await store.dispatch(Actions.SEND_BATCH_NOTIFICATION, formData)
    }

    watch(errorNotification, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.error(errorNotification.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(sendBatchNotification, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        router.push('/')
        toast.success(sendBatchNotification.value.successMessage, {
          position: 'top-right'
        })
      }
    })
    watch(singleBatch, (newValue) => {
      if (newValue) {
        formVal.value.subject = singleBatch.value?.data?.name
      }
    })

    // Calling the signle batch api
    fetchSingleBatch()
    fetchAllLists()

    return {
      validationSchema,
      submit,
      TICKET_IT,
      singleBatch,
      showBatchLoading,
      allRegions,
      allTags,
      allCategories,
      selectedRegions,
      addAllRegion,
      selectedTags,
      addAllTags,
      selectedCategories,
      addAllCategories,
      showUsers,
      userStatus,
      allLogins,
      selectedLogins,
      addAllLogins,
      emailTemplate,
      loader,
      formVal
    }
  }
})
</script>
