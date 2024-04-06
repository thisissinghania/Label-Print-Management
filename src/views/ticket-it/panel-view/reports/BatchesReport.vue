<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <navigation-bar />

    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12" sm="6" md="6">
          <v-col class="pa-0 subpage-title">Batches Report</v-col>
        </v-col>
        <v-col cols="12" sm="6" md="6" class="d-flex flex-wrap justify-sm-end">
          <!-- <button-with-icon class="dark-yellow ma-1"
            ><span><img src="@/assets/ticket-it/images/export-icon.svg" /></span>
            <p>Export</p></button-with-icon
          > -->
        </v-col>
      </v-row>
    </v-col>

    <v-col class="filter-area mt-md-3">
      <!-- form start -->
      <VeeForm id="filter-form" @submit="submit" :validation-schema="validationSchema">
        <v-row>
          <v-col class="custom-field" cols="12" sm="4" md="3" lg="2">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Report</label></v-col>
            <v-col class="field-type field-stype-select pa-0">
              <Field name="report" as="select">
                <option value="" disabled>Select Report</option>
                <option value="printBatch">Printed batches</option>
                <option value="userActivity">User Activity</option>
              </Field>
            </v-col>
            <ErrorMessage name="report" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="4" md="2" lg="2">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>From</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="fromDate" type="date" v-model="formVal.fromDate" />
            </v-col>
            <ErrorMessage name="fromDate" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="4" md="2" lg="2">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>To</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="toDate" type="date" v-model="formVal.toDate" />
            </v-col>
            <ErrorMessage name="toDate" />
          </v-col>
          <v-col class="custom-field mt-md-6" cols="12" sm="4" md="2" lg="2">
            <button-with-icon class="green-bg"
              ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
              <p>Submit</p></button-with-icon
            >
          </v-col>
        </v-row>
      </VeeForm>
      <!-- form end -->
    </v-col>

    <v-col class="table-data" v-if="printedBatches?.data?.length > 0">
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th v-for="(tableHeadings, i) in printedReport" :key="i">
              <v-col class="pa-0 d-flex align-center"> {{ tableHeadings.name }}</v-col>
            </th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody v-for="(tableData, i) in printedBatches?.data" :key="i">
            <printed-table
              :tableData="tableData"
              :index="i"
              :openTableRow="openTableRow?.value"
              v-on:update-open-table-row="updateOpenTableRowInParent"
            />
          </tbody>
        </template>
      </table-structure>
    </v-col>

    <!-- user activity tables start -->

    <!-- single table -->
    <v-col class="table-data" v-if="userActivityData?.data?.statisticsForAdhocPrintOnly.length > 0">
      <h2 class="subpage-title mb-4 mt-2">
        {{ userActivityData?.data?.statisticsForAdhocPrintOnly[0]?.reportType }}
      </h2>
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th v-for="(tableHeadings, i) in userActivityReport" :key="i">
              <v-col class="pa-0 d-flex align-center"> {{ tableHeadings.name }}</v-col>
            </th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody>
            <tr
              v-for="(tableData, i) in userActivityData?.data?.statisticsForAdhocPrintOnly"
              :key="i"
            >
              <td class="pt-4 pb-4">{{ tableData.userLogin }}</td>
              <td class="pt-4 pb-4">{{ tableData.address }}</td>
              <td class="pt-4 pb-4">{{ tableData.region }}</td>
              <td class="pt-4 pb-4">{{ formatDateTime(tableData.dateCreated) }}</td>
              <td class="pt-4 pb-4">{{ formatDateTime(tableData.dateModified) }}</td>
              <td class="pt-4 pb-4">{{ tableData.groupName }}</td>
              <td class="pt-4 pb-4">{{ tableData.storeCategory }}</td>
              <td class="pt-4 pb-4">{{ tableData.tags }}</td>
              <td class="pt-4 pb-4">{{ tableData.zone }}</td>
            </tr>
          </tbody>
        </template>
      </table-structure>
    </v-col>

    <!-- single table -->
    <v-col class="table-data" v-if="userActivityData?.data?.statisticsForBatchPrintOnly.length > 0">
      <h2 class="subpage-title mb-4 mt-2">
        {{ userActivityData?.data?.statisticsForBatchPrintOnly[0]?.reportType }}
      </h2>
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th v-for="(tableHeadings, i) in userActivityReport" :key="i">
              <v-col class="pa-0 d-flex align-center"> {{ tableHeadings.name }}</v-col>
            </th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody>
            <tr
              v-for="(tableData, i) in userActivityData?.data?.statisticsForBatchPrintOnly"
              :key="i"
            >
              <td class="pt-4 pb-4">{{ tableData.userLogin }}</td>
              <td class="pt-4 pb-4">{{ tableData.address }}</td>
              <td class="pt-4 pb-4">{{ tableData.region }}</td>
              <td class="pt-4 pb-4">{{ formatDateTime(tableData.dateCreated) }}</td>
              <td class="pt-4 pb-4">{{ formatDateTime(tableData.dateModified) }}</td>
              <td class="pt-4 pb-4">{{ tableData.groupName }}</td>
              <td class="pt-4 pb-4">{{ tableData.storeCategory }}</td>
              <td class="pt-4 pb-4">{{ tableData.tags }}</td>
              <td class="pt-4 pb-4">{{ tableData.zone }}</td>
            </tr>
          </tbody>
        </template>
      </table-structure>
    </v-col>

    <!-- single table -->
    <v-col
      class="table-data"
      v-if="userActivityData?.data?.statisticsForBothAdhocAndBatch.length > 0"
    >
      <h2 class="subpage-title mb-4 mt-2">
        {{ userActivityData?.data?.statisticsForBothAdhocAndBatch[0]?.reportType }}
      </h2>
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th v-for="(tableHeadings, i) in userActivityReport" :key="i">
              <v-col class="pa-0 d-flex align-center"> {{ tableHeadings.name }}</v-col>
            </th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody>
            <tr
              v-for="(tableData, i) in userActivityData?.data?.statisticsForBothAdhocAndBatch"
              :key="i"
            >
              <td class="pt-4 pb-4">{{ tableData.userLogin }}</td>
              <td class="pt-4 pb-4">{{ tableData.address }}</td>
              <td class="pt-4 pb-4">{{ tableData.region }}</td>
              <td class="pt-4 pb-4">{{ formatDateTime(tableData.dateCreated) }}</td>
              <td class="pt-4 pb-4">{{ formatDateTime(tableData.dateModified) }}</td>
              <td class="pt-4 pb-4">{{ tableData.groupName }}</td>
              <td class="pt-4 pb-4">{{ tableData.storeCategory }}</td>
              <td class="pt-4 pb-4">{{ tableData.tags }}</td>
              <td class="pt-4 pb-4">{{ tableData.zone }}</td>
            </tr>
          </tbody>
        </template>
      </table-structure>
    </v-col>

    <!-- single table -->
    <v-col
      class="table-data"
      v-if="userActivityData?.data?.statisticsForLoggedInPrintNone.length > 0"
    >
      <h2 class="subpage-title mb-4 mt-2">
        {{ userActivityData?.data?.statisticsForLoggedInPrintNone[0]?.reportType }}
      </h2>
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th v-for="(tableHeadings, i) in userActivityReport" :key="i">
              <v-col class="pa-0 d-flex align-center"> {{ tableHeadings.name }}</v-col>
            </th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody>
            <tr
              v-for="(tableData, i) in userActivityData?.data?.statisticsForLoggedInPrintNone"
              :key="i"
            >
              <td class="pt-4 pb-4">{{ tableData.userLogin }}</td>
              <td class="pt-4 pb-4">{{ tableData.address }}</td>
              <td class="pt-4 pb-4">{{ tableData.region }}</td>
              <td class="pt-4 pb-4">{{ formatDateTime(tableData.dateCreated) }}</td>
              <td class="pt-4 pb-4">{{ formatDateTime(tableData.dateModified) }}</td>
              <td class="pt-4 pb-4">{{ tableData.groupName }}</td>
              <td class="pt-4 pb-4">{{ tableData.storeCategory }}</td>
              <td class="pt-4 pb-4">{{ tableData.tags }}</td>
              <td class="pt-4 pb-4">{{ tableData.zone }}</td>
            </tr>
          </tbody>
        </template>
      </table-structure>
    </v-col>

    <!-- single table -->
    <v-col class="table-data" v-if="userActivityData?.data?.statisticsForNotLoggedIn.length > 0">
      <h2 class="subpage-title mb-4 mt-2">
        {{ userActivityData?.data?.statisticsForNotLoggedIn[0]?.reportType }}
      </h2>
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th v-for="(tableHeadings, i) in userActivityReport" :key="i">
              <v-col class="pa-0 d-flex align-center"> {{ tableHeadings.name }}</v-col>
            </th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody>
            <tr v-for="(tableData, i) in userActivityData?.data?.statisticsForNotLoggedIn" :key="i">
              <td class="pt-4 pb-4">{{ tableData.userLogin }}</td>
              <td class="pt-4 pb-4">{{ tableData.address }}</td>
              <td class="pt-4 pb-4">{{ tableData.region }}</td>
              <td class="pt-4 pb-4">{{ formatDateTime(tableData.dateCreated) }}</td>
              <td class="pt-4 pb-4">{{ formatDateTime(tableData.dateModified) }}</td>
              <td class="pt-4 pb-4">{{ tableData.groupName }}</td>
              <td class="pt-4 pb-4">{{ tableData.storeCategory }}</td>
              <td class="pt-4 pb-4">{{ tableData.tags }}</td>
              <td class="pt-4 pb-4">{{ tableData.zone }}</td>
            </tr>
          </tbody>
        </template>
      </table-structure>
    </v-col>
  </v-col>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import NavigationBar from '@/components/ticket-it/navigations/NavigationBar.vue'
import { printedReport } from '@/core/ticket-it/data/printedReport'
import { userActivityReport } from '@/core/ticket-it/data/userActivityReport'
import { userActivityReportData } from '@/core/ticket-it/data/userActivityReportData'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import TableStructure from '@/components/ticket-it/table/TableStructure.vue'
import PrintedTable from '@/views/ticket-it/panel-view/reports/PrintedTable.vue'
import { validationSchema } from '@/core/ticket-it/validations/BatchesReport.js'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import { formatDateTime, formatNormalDate, getOneMonthAgo } from '@/core/ticket-it/global/Utils.js'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'batches-report',
  components: {
    'navigation-bar': NavigationBar,
    'button-with-icon': ButtonWithIcon,
    'table-structure': TableStructure,
    'page-loader': PageLoader,
    'printed-table': PrintedTable,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup() {
    const store = useStore()
    const toast = useToast()
    const loader = ref(false)
    const openTableRow = ref()
    const formVal = ref({
      toDate: formatNormalDate(new Date()),
      fromDate: getOneMonthAgo()
    })

    store.commit(Mutations.SET_USER_ACTIVITY, null)
    store.commit(Mutations.SET_PRINTED_BATCHES, null)
    store.commit(Mutations.SET_PRINT_REPORT_DETAIL, null)

    const errorReports = computed(() => {
      return store.getters.errorReports
    })
    const printedBatches = computed(() => {
      return store.getters.printedBatchesSuccess
    })
    const userActivityData = computed(() => {
      return store.getters.userActivitySuccess
    })

    const submit = async (values) => {
      loader.value = true
      // eslint-disable-next-line no-unused-vars
      const { report, ...data } = values
      if (values?.report == 'printBatch') {
        await store.dispatch(Actions.PRINTED_BATCHES, data)
      } else {
        await store.dispatch(Actions.USER_ACTIVITY, data)
      }
    }

    const updateOpenTableRowInParent = (newOpenTableRow) => {
      openTableRow.value = newOpenTableRow
    }

    watch(errorReports, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.error(errorReports.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(printedBatches, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
      }
    })
    watch(userActivityData, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
      }
    })

    return {
      printedReport,
      validationSchema,
      submit,
      loader,
      userActivityReport,
      userActivityReportData,
      printedBatches,
      userActivityData,
      formatDateTime,
      openTableRow,
      updateOpenTableRowInParent,
      formVal
    }
  }
})
</script>
