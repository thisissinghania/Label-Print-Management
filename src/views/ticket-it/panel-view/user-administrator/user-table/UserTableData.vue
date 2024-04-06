<template>
  <tr>
    <td>{{ tableRow?.login }}</td>
    <td>{{ tableRow?.email }}</td>
    <td>{{ tableRow?.firstName }} {{ tableRow?.lastName }}</td>
    <td>{{ tableRow?.regionName }}</td>
    <td>{{ tableRow?.storeCategory }}</td>
    <td>{{ tableRow?.groupName }}</td>
    <td>
      <v-col cols="12 pa-0" class="d-flex">
        <fill-button @click="editModal()" class="small-font-cta light-blue fixed-width ma-1 pa-3"
          ><img src="@/assets/ticket-it/images/pencil.svg"
        /></fill-button>
        <fill-button
          @click="deleteUser(tableRow?.userId)"
          class="small-font-cta fixed-width ma-1 pa-3"
          ><img src="@/assets/ticket-it/images/del.svg"
        /></fill-button>
      </v-col>
    </td>
    <td>
      <label class="switch_cta ma-1" v-if="roleName === ADMIN">
        <input
          type="checkbox"
          :checked="tableRow?.isUserInvoicing"
          @click="updateUserInvoice(tableRow?.userId)"
        />
        <span class="switch-check"></span>
      </label>
      <div v-else>-</div>
    </td>
  </tr>

  <edit-user v-if="editModalStatus" :tableRow="tableRow" v-on:closeModal="editModal" />
</template>

<script>
import { defineComponent, ref, toRef } from 'vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import EditUser from '@/views/ticket-it/panel-view/user-administrator/user-table/edit-user/EditUser.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { ADMIN } from '@/core/ticket-it/global/globalVariables'
import { getUserData } from '@/core/ticket-it/services/JWTService'

import { useStore } from 'vuex'

export default defineComponent({
  name: 'user-table-data',
  components: {
    'fill-button': FillButton,
    'edit-user': EditUser
  },
  props: {
    tableData: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const roleName = getUserData()?.role
    const tableRow = toRef(props, 'tableData')
    let editModalStatus = ref(false)
    const store = useStore()

    const editModal = () => {
      editModalStatus.value = !editModalStatus.value
    }
    const updateUserInvoice = async (userId) => {
      await store.dispatch(Actions.USERS_INVOICE, userId)
    }
    const deleteUser = async (id) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await store.dispatch(Actions.DELETE_USER, id)
      }
    }

    return {
      tableRow,
      editModal,
      editModalStatus,
      updateUserInvoice,
      roleName,
      ADMIN,
      deleteUser
    }
  }
})
</script>
