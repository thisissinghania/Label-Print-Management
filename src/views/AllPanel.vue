<template>
  <v-container fluid class="panel-area">
    <v-col no-gutters class="pannel-middle-area pa-0">
      <v-row no-gutters class="panel-lists" align="center">
        <v-col
          v-for="(panelList, i) in panelListData"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="panel-list-parent"
        >
          <v-col class="single-panel pa-0">
            <router-link :to="panelList.link">
              <v-col-auto class="w-auto pa-0 d-flex align-center">
                <h4>{{ panelList.name }}</h4>
                <span>{{ panelList.subName }}</span>
              </v-col-auto>
              <p v-if="panelList.checkmark == 'none'">more info</p>
              <v-col-auto class="check-mark checked" v-if="panelList.checkmark == 'check'">
                <svg-icon type="mdi" :path="mdiCheck"></svg-icon>
              </v-col-auto>
              <v-col-auto class="check-mark" v-if="panelList.checkmark == 'question'">
                <svg-icon type="mdi" :path="mdiHelp"></svg-icon>
              </v-col-auto>
            </router-link>
          </v-col>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHelp, mdiCheck } from '@mdi/js'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'

export default defineComponent({
  name: 'all-panels',
  components: {
    SvgIcon
  },
  setup() {
    const panelListData = ref([
      {
        name: 'ticket',
        subName: 'It',
        checkmark: 'check',
        link: `${TICKET_IT}/login`
      },
      {
        name: 'deliver',
        subName: 'It',
        checkmark: 'question',
        link: '#'
      },
      {
        name: 'install',
        subName: 'It',
        checkmark: 'question',
        link: '#'
      },
      {
        name: 'approve',
        subName: 'It',
        checkmark: 'question',
        link: '#'
      },
      {
        name: 'automate',
        subName: 'It',
        checkmark: 'question',
        link: '#'
      },
      {
        name: 'dam',
        subName: 'It',
        checkmark: 'question',
        link: '#'
      },
      {
        name: 'personalise',
        subName: 'It',
        checkmark: 'none',
        link: '#'
      },
      {
        name: 'mine',
        subName: 'It',
        checkmark: 'none',
        link: '#'
      }
    ])
    return {
      panelListData,
      mdiHelp,
      mdiCheck
    }
  }
})
</script>
