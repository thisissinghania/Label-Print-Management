<template>
  <button class="blank_cta">
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'blank-button'
})
</script>
