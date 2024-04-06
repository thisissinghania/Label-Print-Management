<template>
  <v-col class="panel-header w-100">
    <v-row>
      <v-col class="pa-0 left-header">
        <v-col-auto class="switch-panel">
          <v-col class="switch-panel-click" @click="showSidebar()">
            <img src="@/assets/ticket-it/images/panel.svg" alt="panel" />
            <p>Switch Panel</p>
          </v-col>
          <sidebar-panels v-if="sidebarStatus" v-on:showSidebar="showSidebar" />
        </v-col-auto>
        <v-col-auto class="home-icon"
          ><router-link :to="`${TICKET_IT}/latest-batches`"
            ><img src="@/assets/ticket-it/images/home.svg" alt="home" /></router-link
        ></v-col-auto>
      </v-col>
      <v-col class="pa-0 center-header"
        ><img src="@/assets/ticket-it/images/h-logo.png" alt="h-logo"
      /></v-col>
      <v-col class="right-header">
        <v-col-auto class="client-logo mr-4" v-if="userImage"
          ><img :src="IMG_BASE_URL + userImage"
        /></v-col-auto>
        <button class="settings" @click="statusChange()">
          <img src="@/assets/ticket-it/images/setting.svg" alt="settings" />
          <v-col class="all-settings pa-0" v-if="currentStatus">
            <router-link
              :to="`${TICKET_IT}/user-administrator`"
              v-if="roleName === HEAD_OFFICE || roleName === ADMIN"
              ><span><img src="@/assets/ticket-it/images/user.svg" alt="user" /></span> User
              Administration</router-link
            >
            <router-link
              :to="`${TICKET_IT}/image-management`"
              v-if="roleName === HEAD_OFFICE || roleName === REGIONAL_MANAGER"
              ><span><img src="@/assets/ticket-it/images/image.svg" alt="image" /></span> Image
              Management</router-link
            >
            <router-link :to="`${TICKET_IT}/ticket-setup`" v-if="roleName === HEAD_OFFICE"
              ><span><img src="@/assets/ticket-it/images/tickets.svg" alt="ticket" /></span> Ticket
              Setup</router-link
            >
            <router-link :to="`${TICKET_IT}/your-account`"
              ><span><img src="@/assets/ticket-it/images/user.svg" alt="ticket" /></span> Your
              Account</router-link
            >
            <router-link class="d-none" :to="`${TICKET_IT}/plans-and-pricing`"
              ><span><img src="@/assets/ticket-it/images/dollar.svg" alt="ticket" /></span> Plans
              &amp; Pricing</router-link
            >
          </v-col>
        </button>
        <button @click="logout()" class="ml-2 ml-md-3 logout">
          <img src="@/assets/ticket-it/images/logout.svg" alt="logout" />
          <v-tooltip activator="parent" location="bottom">Logout</v-tooltip>
        </button>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import SidebarPanels from '@/layouts/ticket-it/sidebar/SidebarPanels.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import router from '@/router'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'
import { HEAD_OFFICE, ADMIN, REGIONAL_MANAGER } from '@/core/ticket-it/global/globalVariables'
import { getUserData } from '@/core/ticket-it/services/JWTService'
import { IMG_BASE_URL } from '@/store/ticket-it/BaseUrl'

export default defineComponent({
  name: 'panel-header',
  components: {
    'sidebar-panels': SidebarPanels
  },
  setup() {
    const toast = useToast()
    const store = useStore()
    const roleName = getUserData()?.role
    const userImage = getUserData()?.LogoPath
    let currentStatus = ref(false)
    let sidebarStatus = ref(false)
    let inactiveTimer

    const statusChange = () => {
      currentStatus.value = !currentStatus.value
    }
    const showSidebar = () => {
      sidebarStatus.value = !sidebarStatus.value
    }

    const logoutSuccess = computed(() => {
      return store.getters.logoutSuccess
    })

    const logout = () => {
      toast.clear()
      store.dispatch(Actions.LOGOUT)
    }

    // auto logout after 10 minutes if user do not interact
    const resetInactiveTimer = () => {
      clearTimeout(inactiveTimer)
      inactiveTimer = setTimeout(logout, 600000)
    }
    window.addEventListener('mousemove', resetInactiveTimer)
    window.addEventListener('keydown', resetInactiveTimer)

    watch(logoutSuccess, (newValue) => {
      if (newValue) {
        toast.success('Logout Successfully', {
          position: 'top-right'
        })
        router.push(`${TICKET_IT}/login`)
        window.location.reload()
      }
    })

    return {
      statusChange,
      showSidebar,
      currentStatus,
      sidebarStatus,
      TICKET_IT,
      logout,
      HEAD_OFFICE,
      REGIONAL_MANAGER,
      roleName,
      ADMIN,
      userImage,
      IMG_BASE_URL
    }
  }
})
</script>
