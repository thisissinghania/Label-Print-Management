<template>
  <page-loader v-if="loader" />
  <tr>
    <td class="pt-4 pb-4">{{ formatDate(tableRow?.publishDate) }}</td>
    <td class="pt-4 pb-4">{{ tableRow?.batchDesc }}</td>
    <td class="pt-4 pb-4">{{ formatDate(tableRow?.promoStartDate) }}</td>
    <td class="pt-4 pb-4">
      <div class="d-flex align-center">
        {{ tableRow?.printed }}
        <fill-button
          class="ml-4 small-cta"
          :class="showPrintValue && isCondition ? '' : 'light-blue'"
          @click="showPrintDetail(tableRow?.masterBatchId)"
          >{{ showPrintValue && isCondition ? 'Hide' : 'Show' }}</fill-button
        >
      </div>
    </td>
    <td class="pt-4 pb-4">
      <div class="d-flex align-center">
        {{ tableRow?.notPrinted }}
        <fill-button
          class="ml-4 small-cta"
          :class="showNonPrintValue && isCondition ? '' : 'light-blue'"
          @click="showNonPrintDetail(tableRow?.masterBatchId)"
          >{{ showNonPrintValue && isCondition ? 'Hide' : 'Show' }}</fill-button
        >
      </div>
    </td>
    <td class="pt-4 pb-4">
      {{ tableRow.sentBatchUserCount }}
    </td>
  </tr>

  <!--eslint-disable-->
  <tr v-if="showPrintValue && isCondition">
    <td colspan="100" class="pa-0">
      <v-col class="inside-table-data" v-if="printReportDetail?.data?.items?.length > 0">
        <v-vol class="d-flex align-center justify-center region-flow">
          <div><strong>Region:</strong> Auckland</div>
          <div>
            <fill-button class="small-cta green-bg px-6" @click="showTableDetail()"
              >Details</fill-button
            >
          </div>
        </v-vol>
        <table-structure v-if="showTableDetailStatus">
          <template v-slot:thead>
            <tr>
              <th v-for="(title, i) in printedReportInside" :key="i">{{ title?.name }}</th>
            </tr>
          </template>
          <template v-slot:tbody>
            <tbody>
              <tr v-for="(details, i) in printReportDetail?.data?.items" :key="i">
                <td>{{ details?.userLogin }}</td>
                <td>{{ details?.userName }}</td>
                <td>{{ details?.userEmail }}</td>
                <td>{{ details?.address }}</td>
                <td>{{ details?.storeCategory }}</td>
                <td>{{ details?.groupName }}</td>
                <td>{{ details?.tags }}</td>
                <td>{{ formatDate(details?.promoStartDate) }}</td>
              </tr>
            </tbody>
          </template>
        </table-structure>
      </v-col>
      <v-col v-else class="pa-0">
        <v-col class="no-batch pa-5 text-center">
          <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
          <p>No Data Available</p>
        </v-col>
      </v-col>
    </td>
  </tr>

  <tr v-if="showNonPrintValue && isCondition">
    <td colspan="100" class="pa-0">
      <v-col class="inside-table-data" v-if="printReportDetail?.data?.items?.length > 0">
        <v-vol class="d-flex align-center justify-center region-flow">
          <div><strong>Region:</strong> {{ userRegion }}</div>
          <div>
            <fill-button class="small-cta green-bg px-6" @click="showTableDetail()"
              >Details</fill-button
            >
          </div>
        </v-vol>
        <table-structure v-if="showTableDetailStatus">
          <template v-slot:thead>
            <tr>
              <th v-for="(title, i) in printedReportInside" :key="i">{{ title?.name }}</th>
            </tr>
          </template>
          <template v-slot:tbody>
            <tbody>
              <tr v-for="(details, i) in printReportDetail?.data?.items" :key="i">
                <td>{{ details?.userLogin }}</td>
                <td>{{ details?.userName }}</td>
                <td>{{ details?.userEmail }}</td>
                <td>{{ details?.address }}</td>
                <td>{{ details?.storeCategory }}</td>
                <td>{{ details?.groupName }}</td>
                <td>{{ details?.tags }}</td>
                <td>{{ formatDate(details?.promoStartDate) }}</td>
              </tr>
            </tbody>
          </template>
        </table-structure>
      </v-col>
      <v-col v-else class="pa-0">
        <v-col class="no-batch pa-5 text-center">
          <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
          <p>No Data Available</p>
        </v-col>
      </v-col>
    </td>
  </tr>
</template>

<script>
import { defineComponent, toRef, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { formatDate } from '@/core/ticket-it/global/Utils.js'
import TableStructure from '@/components/ticket-it/table/TableStructure.vue'
import { printedReportInside } from '@/core/ticket-it/data/printedReportInside.js'
import { getUserData } from '@/core/ticket-it/services/JWTService'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'printed-table',
  components: {
    'fill-button': FillButton,
    'table-structure': TableStructure,
    'page-loader': PageLoader
  },
  props: {
    tableData: {
      type: Object,
      required: false
    },
    openTableRow: {
      type: Number,
      required: false
    },
    index: {
      type: Number,
      required: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const showPrintValue = ref(false)
    const showNonPrintValue = ref(false)
    const tableRow = toRef(props, 'tableData')
    const singleOpenData = toRef(props, 'openTableRow')
    const indexVal = toRef(props, 'index')
    const loader = ref(false)
    const showTableDetailStatus = ref(false)
    const userRegion = getUserData()?.RegionName

    const isCondition = computed(() => {
      return singleOpenData.value === indexVal.value
    })
    const errorReports = computed(() => {
      return store.getters.errorReports
    })
    const printReportDetail = computed(() => {
      return store.getters.printReportDetailSuccess
    })

    const showTableDetail = () => {
      showTableDetailStatus.value = !showTableDetailStatus.value
    }

    const showPrintDetail = async (masterId) => {
      showPrintValue.value = !showPrintValue.value
      if (showPrintValue.value) {
        loader.value = true
        const data = {
          masterBatchId: masterId,
          isPrinted: true
        }
        await store.dispatch(Actions.PRINT_REPORT_DETAIL, data)
      }
      emit('update-open-table-row', (singleOpenData.value = indexVal))
      showNonPrintValue.value = false
      if (isCondition.value) {
        showNonPrintValue.value = false
      }
    }

    const showNonPrintDetail = async (masterId) => {
      showNonPrintValue.value = !showNonPrintValue.value
      if (showNonPrintValue.value) {
        loader.value = true
        const data = {
          masterBatchId: masterId,
          isPrinted: false
        }
        await store.dispatch(Actions.PRINT_REPORT_DETAIL, data)
      }
      emit('update-open-table-row', (singleOpenData.value = indexVal))
      showPrintValue.value = false
      if (isCondition.value) {
        showPrintValue.value = false
      }
    }

    watch(errorReports, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(printReportDetail, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })

    return {
      tableRow,
      formatDate,
      showPrintDetail,
      showNonPrintDetail,
      showPrintValue,
      showNonPrintValue,
      singleOpenData,
      indexVal,
      isCondition,
      printReportDetail,
      printedReportInside,
      loader,
      showTableDetail,
      showTableDetailStatus,
      userRegion
    }
  }
})
</script>
