<template>
  <td>{{ tableRow.filterFieldName }}</td>
  <td>{{ tableRow.filterFieldValue }}</td>
  <td>
    <fill-button
      type="button"
      @click="$emit('removeAppendData', indexVal)"
      class="small-font-cta fixed-width pa-1"
      ><img src="@/assets/ticket-it/images/del.svg"
    /></fill-button>
  </td>
</template>

<script>
import { defineComponent, toRef } from 'vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'

export default defineComponent({
  name: 'esl-filter-table',
  components: {
    'fill-button': FillButton
  },
  props: {
    tableData: {
      type: Object,
      required: false
    },
    index: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    const tableRow = toRef(props, 'tableData')
    const indexVal = toRef(props, 'index')

    return {
      tableRow,
      indexVal
    }
  }
})
</script>
