<template>
  <v-col class="table-scroll pa-0">
    <table class="custom-table-design">
      <thead>
        <slot name="thead"></slot>
      </thead>
      <slot name="tbody"></slot>
    </table>
  </v-col>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'table-structure',
  setup() {
    return {}
  }
})
</script>
