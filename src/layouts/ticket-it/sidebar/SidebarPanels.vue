<template>
  <v-col-auto class="sidebar-panel">
    <v-col class="backdrop" @click="$emit('showSidebar')"></v-col>
    <v-col-auto class="sidebar-inside">
      <v-col class="sidebar-top">
        <v-col class="pa-0 switch-title">
          <img src="@/assets/ticket-it/images/black-dots.svg" alt="black-dots" />
          <p>Switch Panel</p>
        </v-col>
        <button class="close" @click="$emit('showSidebar')">
          <img src="@/assets/ticket-it/images/close.svg" alt="close" />
        </button>
      </v-col>
      <v-col class="panels-listing pa-0">
        <ul>
          <li v-for="(panelList, i) in panelListData" :key="i">
            <router-link :to="panelList.slug"
              >{{ panelList.name }} <span>{{ panelList.subName }}</span>
              <img src="@/assets/ticket-it/images/check.svg" alt="check" v-if="i == 0" />
            </router-link>
          </li>
        </ul>
      </v-col>
    </v-col-auto>
  </v-col-auto>
</template>

<script>
import { defineComponent } from 'vue'
import { panelListData } from '@/core/ticket-it/data/panelListData'
export default defineComponent({
  name: 'sidebar-panels',
  setup() {
    return {
      panelListData
    }
  }
})
</script>
