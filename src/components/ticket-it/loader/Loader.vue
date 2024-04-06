<template>
  <div class="global-loader">
    <v-progress-circular :width="4" color="green" indeterminate></v-progress-circular>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'page-loader',
  setup() {
    return {}
  }
})
</script>
