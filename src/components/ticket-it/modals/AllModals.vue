<template>
  <v-col class="modal_parent pa-5">
    <v-col class="modal_content pa-0" :sm="sizeSM" :md="sizeMD" :lg="sizeLG">
      <v-col class="modal_title pl-5 pr-5"><slot name="modalTitle"></slot></v-col>
      <v-col class="modal_content_area pa-5"> <slot name="modalContent"></slot></v-col>
      <v-col class="modal_footer pa-0"> <slot name="modalFooter"></slot></v-col>
    </v-col>
    <v-col class="modal-backdrop" @click="$emit('closeModal')"></v-col>
  </v-col>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'all-modals',
  props: {
    sizeSM: {
      type: String,
      required: false
    },
    sizeMD: {
      type: String,
      required: false
    },
    sizeLG: {
      type: String,
      required: false
    }
  },
  setup() {
    return {}
  }
})
</script>
