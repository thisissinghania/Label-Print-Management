<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <navigation-bar />

    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12" sm="12" md="12">
          <v-col class="pa-0 go-back mb-5 mt-1 d-flex align-center" @click="goBackPage()">
            <img src="@/assets/ticket-it/images/go-back.svg" alt="go-back" class="mr-3" />
            back
          </v-col>
          <v-col class="pa-0 subpage-title">Preview All Tickets</v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="preview_ticket_area pa-3 pa-md-7" v-if="previewListData?.data">
      <v-row>
        <v-col cols="12" sm="12" md="6" class="preview_right">
          <VeeForm id="preview-all-ticket" @submit="submit" :validation-schema="validationSchema">
            <v-col class="custom-field pa-0">
              <label class="mb-2 d-block">Select Ticket</label>
              <v-col class="field-type field-stype-select preview-ticket-select pa-0">
                <Field
                  name="ticket"
                  v-model="templateDefaultName"
                  as="select"
                  @change="onChangeVal($event.target.value)"
                >
                  <option
                    v-for="quantityList in templateListData"
                    :key="quantityList"
                    :value="quantityList"
                  >
                    {{ quantityList }}
                  </option>
                </Field>
              </v-col>
              <ErrorMessage name="ticket" />
            </v-col>
            <v-col class="pa-0 d-flex">
              <fill-button
                type="button"
                class="small-font-cta dark-blue mt-5 ml-3"
                @click="openRenderingPng()"
                v-if="showSendCta"
                >Send</fill-button
              >
              <fill-button v-else class="small-font-cta light-blue mt-5">Print</fill-button>
            </v-col>
          </VeeForm>
        </v-col>

        <v-col cols="12" sm="12" md="6" class="preview_left">
          <v-col class="shadow_block pa-0">
            <v-col class="pa-md-6 border-top border-bottom" v-if="totalTickets?.length > 0">
              <v-pagination
                v-model="pageNumber"
                :total-visible="3"
                :length="totalTickets?.length"
              ></v-pagination>
            </v-col>

            <v-col class="pa-md-6">
              <v-col class="pa-0 text-center image mb-5">
                <v-col class="pa-0" v-if="singleTicketView?.data?.tickets.length > 0">
                  <div class="preview-ticket">
                    <div class="preview">
                      <div class="pagination-centered pagination-top"></div>
                      <div class="canvas-wrapper" ref="canvasWrapper"></div>
                      <div class="pagination-centered pagination-bottom"></div>
                    </div>
                  </div>
                </v-col>
                <v-col class="pa-0" v-else>
                  <v-col class="no-batch pa-5 text-center">
                    <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
                    <p class="mt-5">No Preview Available</p>
                  </v-col>
                </v-col>
              </v-col>

              <h3>
                {{ formVal.tickets }} Tickets
                {{ formVal.perPage > 1 ? `(${formVal.perPage} Per Page)` : '' }}
              </h3>
              <h3>{{ formVal.sheets }} Sheets Required</h3>
            </v-col>
            <v-col class="pa-md-6 border-top" v-if="totalTickets?.length > 0">
              <v-pagination
                v-model="pageNumber"
                :total-visible="3"
                :length="totalTickets?.length"
              ></v-pagination>
            </v-col>
          </v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col v-else>
      <v-col class="no-batch pa-5 text-center" v-if="showBatchLoading">
        <v-progress-circular :width="4" color="green" indeterminate></v-progress-circular>
        <p class="mt-4">Please Wait...</p>
      </v-col>
      <v-col class="no-batch pa-5 text-center" v-else>
        <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
        <p>No Tickets Available</p>
      </v-col>
    </v-col>
  </v-col>
</template>

<script>
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { defineComponent, ref, computed, watch } from 'vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import NavigationBar from '@/components/ticket-it/navigations/NavigationBar.vue'
import { setQuantities } from '@/core/ticket-it/data/setQuantities'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { validationSchema } from '@/core/ticket-it/validations/BatchAllTicket.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useToast } from 'vue-toast-notification'
import { IMG_BASE_URL } from '@/store/ticket-it/BaseUrl'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'preview-all-ticket',
  components: {
    'navigation-bar': NavigationBar,
    'fill-button': FillButton,
    'page-loader': PageLoader,
    Field,
    VeeForm,
    ErrorMessage
  },
  setup() {
    const showBatchLoading = ref(true)
    const loader = ref(false)
    const store = useStore()
    const toast = useToast()
    const canvasWrapper = ref(null)
    const totalTickets = ref([])
    const pageNumber = ref(1)
    const showSendCta = ref()
    const templateName = ref('')
    const formVal = ref({
      tickets: '',
      sheets: '',
      perPage: ''
    })
    const templateDefaultName = ref('')

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const previewListData = computed(() => {
      return store.getters.previewListDataSuccess
    })
    const templateListData = computed(() => {
      return Object.keys(previewListData.value?.data?.templates)
    })
    const singleTicketView = computed(() => {
      return store.getters.singleTicketViewSuccess
    })

    const fetchPreviewList = async () => {
      const params = new URLSearchParams(window.location.search).get('batchId')
      await store.dispatch(Actions.PREVIEW_LIST_DATA, { batchId: params })
      setTimeout(() => {
        showBatchLoading.value = false
      }, 5000)
    }

    const onChangeVal = async (value) => {
      loader.value = true
      templateName.value = value
      const data = previewListData.value?.data?.templates[value]?.tickets
      const data2 = previewListData.value?.data?.templates[value]?.pages
      const data3 = previewListData.value?.data?.templates[value]?.pagesPerTicket
      const data4 = previewListData.value?.data?.templates[value]?.isPngOutput
      formVal.value.tickets = data
      formVal.value.sheets = data2
      formVal.value.perPage = data3
      showSendCta.value = data4
      const batch = new URLSearchParams(window.location.search).get('batchId')
      const ticketParams = {
        batchId: batch,
        templateName: value,
        isPreview: true,
        ticketsToTake: -1
      }
      await store.dispatch(Actions.SINGLE_TICKET_VIEW, ticketParams)
      pageNumber.value = 1
      canvasWrapper.value.innerHTML = ''
    }

    const submit = async (values) => {
      const batch = new URLSearchParams(window.location.search).get('batchId')
      const payload = {
        id: batch,
        templateName: values?.ticket,
        ticketGuids: [],
        ticketId: '',
        offset: 0,
        quantity: `${previewListData.value?.data?.templates[values?.ticket]?.tickets}`,
        hasTicketSelection: true
      }
      const queryParams = new URLSearchParams(payload).toString()
      window.open(`${TICKET_IT}/building-ticket?${queryParams}`)
    }

    const openRenderingPng = () => {
      const batch = new URLSearchParams(window.location.search).get('batchId')
      const payload = {
        id: batch,
        templateName: templateName.value,
        ticketGuids: [],
        ticketId: '',
        offset: 0,
        quantity: formVal.value.tickets,
        hasTicketSelection: true
      }
      const queryParams = new URLSearchParams(payload).toString()
      window.open(`${TICKET_IT}/building-ticket-png?${queryParams}`)
    }

    const renderTicket = () => {
      singleTicketView.value.data.resourcePath = `${IMG_BASE_URL}${singleTicketView.value.data.resourcePath}`
      // eslint-disable-next-line no-undef
      TicketIt.render(singleTicketView.value.data, (err, pages) => {
        if (err) {
          console.error(err)
          return
        }
        canvasWrapper.value.innerHTML = ''
        pages.forEach((page) => {
          canvasWrapper.value.appendChild(page)
        })
        totalTickets.value = pages
        setCurrentCanvas()
      })
    }

    const setCurrentCanvas = () => {
      canvasWrapper.value.querySelectorAll('canvas').forEach((item, i) => {
        if (i + 1 === pageNumber.value) {
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      })
    }

    const goBackPage = () => {
      window.history.back()
    }

    watch(pageNumber, (newVal) => {
      if (newVal) {
        setCurrentCanvas()
      }
    })

    watch(errorBatch, (newValue) => {
      if (newValue) {
        loader.value = false
        toast.error(errorBatch.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(previewListData, (newVal) => {
      if (newVal) {
        loader.value = false
        const mapConvert = Object.keys(newVal?.data?.templates)[0]
        templateDefaultName.value = mapConvert
        onChangeVal(mapConvert)
      }
    })
    watch(singleTicketView, (newVal) => {
      if (newVal) {
        loader.value = false
        renderTicket()
      }
    })

    // calling the preview list api
    fetchPreviewList()

    return {
      submit,
      setQuantities,
      validationSchema,
      loader,
      previewListData,
      showBatchLoading,
      templateListData,
      onChangeVal,
      formVal,
      canvasWrapper,
      singleTicketView,
      pageNumber,
      totalTickets,
      goBackPage,
      showSendCta,
      openRenderingPng,
      templateDefaultName
    }
  }
})
</script>
