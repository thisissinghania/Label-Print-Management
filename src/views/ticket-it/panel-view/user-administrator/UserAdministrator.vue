<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12" sm="6" md="6">
          <v-col class="pa-0 subpage-title">Users</v-col>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
          class="d-flex flex-wrap justify-sm-end"
          v-if="roleName === ADMIN"
        >
          <router-link
            class="custom_fill_cta green-bg small-font-cta"
            :to="`${TICKET_IT}/user-administrator/create-user`"
            >Create User</router-link
          >
        </v-col>
      </v-row>
    </v-col>

    <v-col class="pa-0 navigation-bar tabs_navigation">
      <v-tabs v-model="tab">
        <v-tab value="headOffice" v-if="roleName === ADMIN" @click="updateRole(2)"
          >head office</v-tab
        >
        <v-tab value="regional" @click="updateRole(3)">regional managers</v-tab>
        <v-tab value="franchise" @click="updateRole(1)">franchisees</v-tab>
      </v-tabs>
    </v-col>
    <v-window v-model="tab">
      <v-window-item value="headOffice" v-if="roleName === ADMIN">
        <user-table :userListData="userListData" :showBatchLoading="showBatchLoading" />
      </v-window-item>
      <v-window-item value="regional">
        <user-table :userListData="userListData" :showBatchLoading="showBatchLoading" />
      </v-window-item>
      <v-window-item value="franchise">
        <user-table :userListData="userListData" :showBatchLoading="showBatchLoading" />
      </v-window-item>
    </v-window>

    <pagination-list :data="userListData" :changeType="userRole" @update-page="updatePage" />
  </v-col>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { ADMIN } from '@/core/ticket-it/global/globalVariables'
import { getUserData } from '@/core/ticket-it/services/JWTService'
import UserTable from '@/views/ticket-it/panel-view/user-administrator/user-table/UserTable.vue'
import PaginationList from '@/components/ticket-it/pagination/paginationList.vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'

export default defineComponent({
  name: 'user-administrator',
  components: {
    'user-table': UserTable,
    'pagination-list': PaginationList,
    'page-loader': PageLoader
  },
  setup() {
    const showBatchLoading = ref(true)
    const loader = ref(false)
    const roleName = getUserData()?.role
    const tokenClientName = getUserData()?.ClientName
    const tab = ref(null)
    const store = useStore()
    const toast = useToast()
    let userRole = ref(roleName === ADMIN ? 2 : 3)
    const params = ref({
      pageNumber: 1,
      pageSize: 10
    })

    const errorUser = computed(() => {
      return store.getters.errorUserAdministration
    })
    const userListData = computed(() => {
      return store.getters.usersListsSuccess
    })
    const userInvoice = computed(() => {
      return store.getters.userInvoiceSuccess
    })
    const updateCurrentUser = computed(() => {
      return store.getters.updateCurrentUserSuccess
    })
    const deleteUser = computed(() => {
      return store.getters.deleteUserSuccess
    })

    const fetchUserList = async () => {
      await store.dispatch(Actions.USERS_ROLES, {
        userRole: userRole.value,
        clientName: roleName === ADMIN ? '' : tokenClientName,
        params: params.value
      })
      loader.value = false

      setTimeout(() => {
        showBatchLoading.value = false
      }, 5000)
    }

    // pagination select page show limit
    const updatePage = (page, pageSize) => {
      params.value.pageNumber = page
      params.value.pageSize = pageSize
      fetchUserList()
      loader.value = true
    }

    const updateRole = (roleId) => {
      params.value.pageNumber = 1
      userRole.value = roleId
      fetchUserList()
      loader.value = true
    }

    watch(errorUser, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.error(errorUser.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(userInvoice, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(userInvoice.value.successMessage, {
          position: 'top-right'
        })
      }
    })
    watch(deleteUser, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(deleteUser.value.successMessage, {
          position: 'top-right'
        })
        fetchUserList()
      }
    })
    watch(updateCurrentUser, (newValue) => {
      toast.clear()
      if (newValue) {
        fetchUserList()
      }
    })

    // fetching the user list api
    fetchUserList()

    return {
      TICKET_IT,
      tab,
      ADMIN,
      roleName,
      updateRole,
      updatePage,
      userListData,
      loader,
      fetchUserList,
      showBatchLoading,
      userRole
    }
  }
})
</script>
