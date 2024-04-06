<template>
  <button class="cta_with_icon">
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'icon-button'
})
</script>
