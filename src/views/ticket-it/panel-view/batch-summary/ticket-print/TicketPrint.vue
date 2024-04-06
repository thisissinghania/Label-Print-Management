<template>
  <popup-area :sizeSM="`12`" :sizeMD="`10`" :sizeLG="`7`" class="modal-content-area-0">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Ticket Type To Print</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <table-structure v-if="!loader && bulkPrint?.data?.ticketNameUrls.length > 0">
        <template v-slot:thead>
          <tr>
            <th>Ticket Name</th>
            <th>Ticket(s)</th>
            <th>Per Page</th>
            <th>Total Sheets</th>
            <th>Print</th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody
            class="text-grey"
            v-for="(printData, i) in bulkPrint?.data?.ticketNameUrls"
            :key="i"
          >
            <ticket-table :tableData="printData" :selectedRow="selectedRow" />
          </tbody>
        </template>
      </table-structure>

      <v-col v-if="!loader && bulkPrint?.data?.ticketNameUrls.length == 0">
        <v-col class="no-batch pa-5 text-center">
          <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
          <p class="mt-2">No Data Available</p>
        </v-col>
      </v-col>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref, computed, watch, toRef } from 'vue'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import TableStructure from '@/components/ticket-it/table/TableStructure.vue'
import TicketTable from '@/views/ticket-it/panel-view/batch-summary/ticket-print/TicketTable.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ticket-print',
  components: {
    'popup-area': Popover,
    'table-structure': TableStructure,
    'page-loader': PageLoader,
    'ticket-table': TicketTable
  },
  props: {
    selectedRows: {
      type: Array,
      required: false
    }
  },
  setup(props) {
    const selectedRow = toRef(props, 'selectedRows')
    const store = useStore()
    const loader = ref(true)

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const bulkPrint = computed(() => {
      return store.getters.bulkPrintSuccess
    })

    watch(errorBatch, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(bulkPrint, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })

    return {
      loader,
      bulkPrint,
      selectedRow
    }
  }
})
</script>
