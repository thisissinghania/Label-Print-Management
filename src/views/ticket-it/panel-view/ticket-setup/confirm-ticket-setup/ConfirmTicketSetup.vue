<template>
  <v-slide-group v-model="model" class="pa-3">
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core1.png" /></span>
          <p>Core Ticket</p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/promo1.png" /></span>
          <p>Promo Ticket</p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
  </v-slide-group>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'confirm-ticket-setup',
  setup() {
    const model = ref(null)
    return {
      model
    }
  }
})
</script>
