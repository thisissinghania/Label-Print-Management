<template>
  <popup-area :sizeSM="`12`" :sizeMD="`7`" :sizeLG="`4`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Ticket View</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <v-col class="pa-0" v-if="singleTicketView?.data?.tickets.length > 0">
        <div class="preview-ticket">
          <div class="preview">
            <div class="pagination-centered pagination-top"></div>
            <div class="canvas-wrapper" ref="canvasWrapper"></div>
            <div class="pagination-centered pagination-bottom"></div>
          </div>
        </div>
        <v-col class="pa-md-6 border-top d-none">
          <v-pagination
            v-model="pageNumber"
            :total-visible="3"
            :length="totalTickets?.length"
          ></v-pagination>
        </v-col>
      </v-col>
      <v-col class="pa-0" v-if="!loader && singleTicketView?.data?.tickets.length == 0">
        <v-col class="no-batch pa-5 text-center">
          <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
          <p>No Preview Available</p>
        </v-col>
      </v-col>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { IMG_BASE_URL } from '@/store/ticket-it/BaseUrl'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ticket-view',
  components: {
    'popup-area': Popover,
    'page-loader': PageLoader
  },
  setup() {
    const store = useStore()
    const loader = ref(true)
    const canvasWrapper = ref(null)
    const totalTickets = ref([])
    const pageNumber = ref(1)

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const singleTicketView = computed(() => {
      return store.getters.singleTicketViewSuccess
    })

    const renderTicket = () => {
      singleTicketView.value.data.resourcePath = `${IMG_BASE_URL}${singleTicketView.value.data.resourcePath}`
      // eslint-disable-next-line no-undef
      TicketIt.render(singleTicketView.value.data, (err, pages) => {
        if (err) {
          console.error(err)
          return
        }
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

    watch(pageNumber, (newVal) => {
      if (newVal) {
        setCurrentCanvas()
      }
    })
    watch(errorBatch, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(singleTicketView, (newVal) => {
      if (newVal) {
        loader.value = false
        renderTicket()
      }
    })

    return {
      singleTicketView,
      loader,
      canvasWrapper,
      totalTickets,
      pageNumber
    }
  }
})
</script>
