<template>
  <v-slide-group v-model="model" class="pa-3">
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-style1.png" /></span>
          <p>
            <input type="radio" name="coreStyle" />
            <span>Boutique-1</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-style2.png" /></span>
          <p>
            <input type="radio" name="coreStyle" />
            <span>Boutique-2</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
  </v-slide-group>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'core-style',
  setup() {
    const model = ref(null)
    return {
      model
    }
  }
})
</script>
