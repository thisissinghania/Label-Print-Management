<template>
  <v-col class="pa-0">
    <panel-header />
    <v-col class="middle-view-area pa-0"><router-view /></v-col>
    <panel-footer />
  </v-col>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '@/layouts/ticket-it/header/PanelHeader.vue'
import Footer from '@/layouts/ticket-it/footer/PanelFooter.vue'
export default defineComponent({
  name: 'main-layout',
  components: {
    'panel-header': Header,
    'panel-footer': Footer
  }
})
</script>
