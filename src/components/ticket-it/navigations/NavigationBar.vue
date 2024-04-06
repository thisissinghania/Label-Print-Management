<template>
  <v-col class="pa-0 navigation-bar">
    <ul>
      <li>
        <router-link
          :to="`${TICKET_IT}/latest-batches`"
          v-if="roleName === HEAD_OFFICE || roleName === FRANCHISEE"
          >batches</router-link
        >
      </li>
      <li>
        <router-link
          :to="`${TICKET_IT}/adhoc-tickets?batchId=${adhocBatchId}`"
          v-if="roleName === HEAD_OFFICE || roleName === FRANCHISEE"
          >adhoc tickets</router-link
        >
      </li>
      <li>
        <router-link
          :to="`${TICKET_IT}/reports`"
          v-if="roleName === HEAD_OFFICE || roleName === REGIONAL_MANAGER"
          >reports</router-link
        >
      </li>
      <li>
        <router-link :to="`${TICKET_IT}/core-master`" v-if="roleName === HEAD_OFFICE"
          >core master</router-link
        >
      </li>
      <li>
        <router-link :to="`${TICKET_IT}/esl-management`" v-if="eslEnableCheck === 'True'"
          >ESL Management</router-link
        >
      </li>
    </ul>
  </v-col>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { HEAD_OFFICE, REGIONAL_MANAGER, FRANCHISEE } from '@/core/ticket-it/global/globalVariables'
import { getUserData } from '@/core/ticket-it/services/JWTService'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'navigation-bar',
  setup() {
    const roleName = getUserData()?.role
    const eslEnableCheck = getUserData()?.IsEslEnabled
    const store = useStore()
    let adhocBatchId = ref()
    const paramsBatch = ref({
      pageNumber: 1,
      pageSize: 10,
      BatchTypes: [2],
      subStatus: 'string'
    })

    const batchList = computed(() => {
      return store.getters.adhocBatchListData
    })

    const fetchLatestBatches = async () => {
      if (!localStorage.getItem('AdhocBatchId')) {
        await store.dispatch(Actions.ADHOC_BATCH_LIST, paramsBatch.value)
      }
    }

    watch(batchList, (newValue) => {
      if (newValue) {
        window.localStorage.setItem('AdhocBatchId', batchList.value?.data[0]?.batchId)
        setBatchId()
      }
    })

    const setBatchId = () => {
      if (localStorage.getItem('AdhocBatchId')) {
        adhocBatchId.value = window.localStorage.getItem('AdhocBatchId')
      }
    }

    // adhoc batch
    fetchLatestBatches()
    setBatchId()

    return {
      TICKET_IT,
      roleName,
      HEAD_OFFICE,
      REGIONAL_MANAGER,
      FRANCHISEE,
      adhocBatchId,
      eslEnableCheck
    }
  }
})
</script>
