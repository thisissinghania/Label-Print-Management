<template>
  <button class="custom_fill_cta">
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'fill-button'
})
</script>
