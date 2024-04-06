<template>
  <tr>
    <td class="text-grey">{{ tableRow.name }}</td>
    <td class="text-grey">{{ tableRow.ticketCount }}</td>
    <td class="text-grey">{{ tableRow.ticketsPerPage }}</td>
    <td class="text-grey">{{ tableRow.sheetsRequired }}</td>
    <td>
      <fill-button
        class="small-font-cta light-blue pa-3"
        @click="printTicketData(tableRow.ticketCount)"
        >Print</fill-button
      >
    </td>
  </tr>
</template>

<script>
import { defineComponent, toRef } from 'vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'

export default defineComponent({
  name: 'ticket-table',
  components: {
    'fill-button': FillButton
  },
  props: {
    tableData: {
      type: Object,
      required: false
    },
    selectedRow: {
      type: Array,
      required: false
    }
  },
  setup(props) {
    const tableRow = toRef(props, 'tableData')
    const selectedRows = toRef(props, 'selectedRow')

    const printTicketData = async (quantity) => {
      const batch = new URLSearchParams(window.location.search).get('batchId')
      const payload = {
        id: batch,
        templateName: tableRow.value.name,
        ticketGuids: selectedRows.value,
        ticketId: '',
        offset: 0,
        quantity: `${quantity}`,
        hasTicketSelection: true
      }
      const queryParams = new URLSearchParams(payload).toString()
      window.open(`${TICKET_IT}/building-ticket?${queryParams}`)
    }

    return {
      tableRow,
      selectedRows,
      printTicketData
    }
  }
})
</script>
