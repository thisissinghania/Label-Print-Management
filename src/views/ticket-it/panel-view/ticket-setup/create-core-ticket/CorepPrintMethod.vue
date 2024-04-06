<template>
  <v-slide-group v-model="model" class="pa-3">
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-print1.png" /></span>
          <p>
            <input type="radio" name="corePrint" />
            <span>Print on Preprinted Stock</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-print2.png" /></span>
          <p>
            <input type="radio" name="corePrint" />
            <span>Print to Colour Printer</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
  </v-slide-group>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'core-print-method',
  setup() {
    const model = ref(null)
    return {
      model
    }
  }
})
</script>
