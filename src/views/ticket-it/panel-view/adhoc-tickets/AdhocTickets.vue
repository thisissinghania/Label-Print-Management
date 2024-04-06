<template>
  <batch-summary />
</template>

<script>
import { defineComponent } from 'vue'
import BatchSummary from '@/views/ticket-it/panel-view/batch-summary/BatchSummary.vue'

export default defineComponent({
  name: 'adhoc-tickets',
  components: {
    'batch-summary': BatchSummary
  },
  setup() {
    return {}
  }
})
</script>
