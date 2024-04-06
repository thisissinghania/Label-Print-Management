<template>
  <building-ticket />
</template>

<script>
import { defineComponent, computed, watch } from 'vue'
import BuildingTicket from '@/views/ticket-it/panel-view/adhoc-tickets/building-ticket/BuildingTicket.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'building-ticket-page',
  components: {
    'building-ticket': BuildingTicket
  },
  setup() {
    const store = useStore()
    const toast = useToast()

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const startRendering = computed(() => {
      return store.getters.startRenderingSuccess
    })
    const checkPdfStatus = computed(() => {
      return store.getters.checkPdfStatusSuccess
    })

    const fetchPdfApi = async () => {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)

      //   get all query string
      const batchId = urlParams.get('id')
      const templateName = urlParams.get('templateName')
      const ticketGuids = urlParams.get('ticketGuids')
      const ticketId = urlParams.get('ticketId')
      const quantity = urlParams.get('quantity')

      const payload = {
        id: batchId,
        templateName: templateName,
        ticketGuids: ticketGuids == [''] ? [] : ticketGuids.split(','),
        ticketId: ticketId || '',
        offset: 0,
        quantity: quantity,
        hasTicketSelection: true
      }
      await store.dispatch(Actions.START_RENDERING, payload)
    }

    setTimeout(function () {
      fetchPdfApi()
    }, 2000)

    const showPdfTicket = async () => {
      const data = startRendering?.value?.data?.fileGuid
      await store.dispatch(Actions.CHECK_PDF_STATUS, data)
    }
    const openTicketPdf = async () => {
      if (checkPdfStatus.value?.data != '') {
        window.location.href = checkPdfStatus.value?.data
      } else {
        setTimeout(function () {
          showPdfTicket()
        }, 2000)
      }
    }

    watch(errorBatch, (newVal) => {
      if (newVal) {
        toast.error(errorBatch.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(startRendering, (newVal) => {
      if (newVal) {
        showPdfTicket()
      }
    })
    watch(checkPdfStatus, (newVal) => {
      if (newVal) {
        openTicketPdf()
      }
    })

    return {}
  }
})
</script>
