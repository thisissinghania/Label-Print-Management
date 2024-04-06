<template>
  <popup-area :sizeSM="`7`" :sizeMD="`5`" :sizeLG="`4`">
    <template v-slot:modalTitle>
      <h3>Building your tickets..</h3>
    </template>
    <template v-slot:modalContent>
      <v-col class="pa-0 text-center"
        ><img
          src="@/assets/ticket-it/images/sand-clock.gif"
          class="animate-rotate"
          alt="sand-clock"
      /></v-col>
      <v-col class="text-center pa-5">
        <p class="mb-4">
          This may take a few minutes depending on the number of tickets you're trying to print.
          When your tickets have been rendered by our system, you will have access to them for the
          next 2 hours.
        </p>
        <p>Once rendered, your ticket's will download automatically.</p>
      </v-col>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent } from 'vue'
import Popover from '@/components/ticket-it/modals/AllModals.vue'

export default defineComponent({
  name: 'building-ticket',
  components: {
    'popup-area': Popover
  },
  setup() {
    return {}
  }
})
</script>
