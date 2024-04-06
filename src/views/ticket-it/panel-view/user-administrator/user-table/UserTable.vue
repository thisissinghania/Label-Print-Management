<template>
  <v-col class="pa-0">
    <v-col class="mt-2 table-data" v-if="userData?.data && userData?.data?.length > 0">
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th v-for="(title, i) in regionalTitle" :key="i">{{ title.name }}</th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody v-for="(tableData, i) in userData.data" :key="i">
            <user-table-data :tableData="tableData" />
          </tbody>
        </template>
      </table-structure>
    </v-col>

    <v-col v-else>
      <v-col class="no-batch pa-5 text-center" v-if="showBatchLoadingStatus">
        <v-progress-circular :width="4" color="green" indeterminate></v-progress-circular>
        <p class="mt-4">Please Wait...</p>
      </v-col>
      <v-col class="no-batch pa-5 text-center" v-else>
        <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
        <p>No Data Available</p>
      </v-col>
    </v-col>
  </v-col>
</template>

<script>
import { defineComponent, toRef } from 'vue'
import TableStructure from '@/components/ticket-it/table/TableStructure.vue'
import { regionalTitle } from '@/core/ticket-it/data/regionalTitle.js'
import { regionalData } from '@/core/ticket-it/data/regionalData.js'
import UserTableData from '@/views/ticket-it/panel-view/user-administrator/user-table/UserTableData.vue'

export default defineComponent({
  name: 'user-table',
  components: {
    'table-structure': TableStructure,
    'user-table-data': UserTableData
  },
  props: {
    userListData: {
      type: Object,
      required: false
    },
    showBatchLoading: {
      type: Boolean,
      required: false
    }
  },
  setup(props) {
    const userData = toRef(props, 'userListData')
    const showBatchLoadingStatus = toRef(props, 'showBatchLoading')

    return {
      regionalTitle,
      regionalData,
      userData,
      showBatchLoadingStatus
    }
  }
})
</script>
