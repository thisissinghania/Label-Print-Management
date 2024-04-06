<template>
  <v-col class="pa-0">
    <batch-listing
      :heading="batchValues?.name"
      :dateFrom="batchValues?.dateFrom"
      :dateTo="batchValues?.dateTo"
      :products="batchValues?.productAmount"
      :type="batchValues?.type"
      :lastEdit="batchValues?.lastEdited"
      :notes="batchValues?.notes"
      :expired="batchValues?.isExpired"
      :recalled="batchValues?.isRecalled"
      :sent="batchValues?.isSent"
    />
    <v-col class="batch_buttons">
      <v-row>
        <v-col cols="12" sm="12" class="d-flex flex-wrap justify-sm-end pt-0 pt-sm-3">
          <router-link
            class="cta_with_icon dark-blue mt-2 mt-sm-0"
            :to="`${TICKET_IT}/latest-batches/batch-summary?batchId=${batchValues?.batchId}`"
            ><span><img src="@/assets/ticket-it/images/view.svg" /></span>
            <p>View Batch</p></router-link
          >
        </v-col>
      </v-row>
    </v-col>
  </v-col>
</template>

<script>
import { defineComponent, toRef } from 'vue'
import BatchListing from '@/components/ticket-it/batch/BatchListing.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'

export default defineComponent({
  name: 'send-notification-data',
  components: {
    'batch-listing': BatchListing
  },
  props: {
    batchListData: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const batchValues = toRef(props, 'batchListData')

    return {
      TICKET_IT,
      batchValues
    }
  }
})
</script>
