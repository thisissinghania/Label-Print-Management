<template>
  <v-col class="pa-0">
    <navigation-bar />
    <page-loader v-if="loader" />

    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12">
          <v-col class="pa-0 subpage-title">Change Report</v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="mt-2">
      <v-col class="shadow-block pa-md-5">
        <VeeForm id="change-report" @submit="submit" :validation-schema="validationSchema">
          <v-row>
            <!-- left -->
            <v-col
              cols="12"
              sm="12"
              md="6"
              v-if="changeReportList?.data?.listChangeReport.length > 0"
            >
              <v-row>
                <v-col class="custom-field" cols="12">
                  <v-col class="pa-0 mb-1 field-label bold-label"
                    ><label>Select Change Report</label></v-col
                  >
                  <v-col class="field-type field-stype-select pa-0">
                    <Field name="changeReport" as="select" v-model="formData.changeReport">
                      <option value="" disabled>Select</option>
                      <option value="All">All</option>
                      <option
                        v-for="listData in changeReportList?.data?.listChangeReport"
                        :key="listData"
                        :value="listData"
                      >
                        {{ listData }}
                      </option>
                    </Field>
                  </v-col>
                  <ErrorMessage name="changeReport" />
                </v-col>

                <v-col class="custom-field" cols="12" sm="6">
                  <v-col class="pa-0 mb-1 field-label bold-label"><label>Date From</label></v-col>
                  <v-col class="field-type pa-0">
                    <Field name="dateFrom" type="date" v-model="formData.dateFrom" />
                  </v-col>
                  <ErrorMessage name="dateFrom" />
                </v-col>
                <v-col class="custom-field" cols="12" sm="6">
                  <v-col class="pa-0 mb-1 field-label bold-label"><label>Time From</label></v-col>
                  <v-col class="field-type pa-0">
                    <Field name="timeFrom" type="time" v-model="formData.timeFrom" />
                  </v-col>
                  <ErrorMessage name="timeFrom" />
                </v-col>
                <v-col class="custom-field" cols="12" sm="6">
                  <v-col class="pa-0 mb-1 field-label bold-label"><label>Date To</label></v-col>
                  <v-col class="field-type pa-0">
                    <Field name="dateTo" type="date" v-model="formData.dateTo" />
                  </v-col>
                  <ErrorMessage name="dateTo" />
                </v-col>
                <v-col class="custom-field" cols="12" sm="6">
                  <v-col class="pa-0 mb-1 field-label bold-label"><label>Time To</label></v-col>
                  <v-col class="field-type pa-0">
                    <Field name="timeTo" type="time" v-model="formData.timeTo" />
                  </v-col>
                  <ErrorMessage name="timeTo" />
                </v-col>
              </v-row>
            </v-col>

            <!-- right -->
            <v-col
              cols="12"
              sm="12"
              md="6"
              v-if="
                changeReportList?.data?.listOfSearchAttribute1.length > 0 ||
                changeReportList?.data?.listOfSearchAttribute2.length > 0 ||
                changeReportList?.data?.listOfSearchAttribute3.length > 0 ||
                changeReportList?.data?.listOfSearchAttribute4.length > 0 ||
                changeReportList?.data?.listOfSearchAttribute5.length > 0
              "
            >
              <v-row>
                <v-col
                  class="custom-field"
                  cols="12"
                  sm="6"
                  v-if="changeReportList?.data?.listOfSearchAttribute1.length > 0"
                >
                  <v-col class="pa-0 mb-1 field-label bold-label"
                    ><label>{{ changeReportList?.data?.searchAttributeField1 }}</label></v-col
                  >
                  <v-col class="pa-0 field-multi-select">
                    <Field name="type1" v-slot="{ multiFieldFirst }" v-model="firstListData">
                      <v-select
                        v-bind="multiFieldFirst"
                        v-model="firstListData"
                        :items="changeReportList?.data?.listOfSearchAttribute1"
                        label="Select"
                        multiple
                      >
                        <template #prepend-item>
                          <v-list-item title="Select All" @click="addFistMultiselect">
                            <template #prepend>
                              <v-checkbox-btn></v-checkbox-btn>
                            </template>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>
                      </v-select>
                    </Field>
                  </v-col>
                </v-col>

                <v-col
                  class="custom-field"
                  cols="12"
                  sm="6"
                  v-if="changeReportList?.data?.listOfSearchAttribute2.length > 0"
                >
                  <v-col class="pa-0 mb-1 field-label bold-label"
                    ><label>{{ changeReportList?.data?.searchAttributeField2 }}</label></v-col
                  >
                  <v-col class="pa-0 field-multi-select">
                    <Field name="type2" v-slot="{ multiFieldSecond }" v-model="secondListData">
                      <v-select
                        v-bind="multiFieldSecond"
                        v-model="secondListData"
                        :items="changeReportList?.data?.listOfSearchAttribute2"
                        label="Select"
                        multiple
                      >
                        <template #prepend-item>
                          <v-list-item title="Select All" @click="addSecondMultiselect">
                            <template #prepend>
                              <v-checkbox-btn></v-checkbox-btn>
                            </template>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>
                      </v-select>
                    </Field>
                  </v-col>
                </v-col>

                <v-col
                  class="custom-field"
                  cols="12"
                  sm="6"
                  v-if="changeReportList?.data?.listOfSearchAttribute3.length > 0"
                >
                  <v-col class="pa-0 mb-1 field-label bold-label"
                    ><label>{{ changeReportList?.data?.searchAttributeField3 }}</label></v-col
                  >
                  <v-col class="pa-0 field-multi-select">
                    <Field name="type3" v-slot="{ multiFieldThird }" v-model="thirdListData">
                      <v-select
                        v-bind="multiFieldThird"
                        v-model="thirdListData"
                        :items="changeReportList?.data?.listOfSearchAttribute3"
                        label="Select"
                        multiple
                      >
                        <template #prepend-item>
                          <v-list-item title="Select All" @click="addThirdMultiselect">
                            <template #prepend>
                              <v-checkbox-btn></v-checkbox-btn>
                            </template>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>
                      </v-select>
                    </Field>
                  </v-col>
                </v-col>

                <v-col
                  class="custom-field"
                  cols="12"
                  sm="6"
                  v-if="changeReportList?.data?.listOfSearchAttribute4.length > 0"
                >
                  <v-col class="pa-0 mb-1 field-label bold-label"
                    ><label>{{ changeReportList?.data?.searchAttributeField4 }}</label></v-col
                  >
                  <v-col class="pa-0 field-multi-select">
                    <Field name="type4" v-slot="{ multiFieldFourth }" v-model="fourthListData">
                      <v-select
                        v-bind="multiFieldFourth"
                        v-model="fourthListData"
                        :items="changeReportList?.data?.listOfSearchAttribute4"
                        label="Select"
                        multiple
                      >
                        <template #prepend-item>
                          <v-list-item title="Select All" @click="addFourthMultiselect">
                            <template #prepend>
                              <v-checkbox-btn></v-checkbox-btn>
                            </template>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>
                      </v-select>
                    </Field>
                  </v-col>
                </v-col>

                <v-col
                  class="custom-field"
                  cols="12"
                  sm="6"
                  v-if="changeReportList?.data?.listOfSearchAttribute5.length > 0"
                >
                  <v-col class="pa-0 mb-1 field-label bold-label"
                    ><label>{{ changeReportList?.data?.searchAttributeField5 }}</label></v-col
                  >
                  <v-col class="pa-0 field-multi-select">
                    <Field name="type5" v-slot="{ multiFieldFifth }" v-model="fifthListData">
                      <v-select
                        v-bind="multiFieldFifth"
                        v-model="fifthListData"
                        :items="changeReportList?.data?.listOfSearchAttribute5"
                        label="Select"
                        multiple
                      >
                        <template #prepend-item>
                          <v-list-item title="Select All" @click="addFifthMultiselect">
                            <template #prepend>
                              <v-checkbox-btn></v-checkbox-btn>
                            </template>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>
                      </v-select>
                    </Field>
                  </v-col>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              cols="12"
              v-if="
                changeReportList?.data?.listOfSearchAttribute1.length == 0 &&
                changeReportList?.data?.listOfSearchAttribute2.length == 0 &&
                changeReportList?.data?.listOfSearchAttribute3.length == 0 &&
                changeReportList?.data?.listOfSearchAttribute4.length == 0 &&
                changeReportList?.data?.listOfSearchAttribute5.length == 0 &&
                changeReportList?.data?.listChangeReport.length == 0
              "
            >
              <v-col class="no-batch pa-5 text-center">
                <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
                <p>No Data Available</p>
              </v-col>
            </v-col>

            <v-col
              cols="12"
              v-if="
                changeReportList?.data?.listOfSearchAttribute1.length > 0 ||
                changeReportList?.data?.listOfSearchAttribute2.length > 0 ||
                changeReportList?.data?.listOfSearchAttribute3.length > 0 ||
                changeReportList?.data?.listOfSearchAttribute4.length > 0 ||
                changeReportList?.data?.listOfSearchAttribute5.length > 0 ||
                changeReportList?.data?.listChangeReport.length > 0
              "
            >
              <button-with-icon class="green-bg"
                ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
                <p>Submit</p></button-with-icon
              >
            </v-col>
          </v-row>
        </VeeForm>
      </v-col>
    </v-col>

    <v-col
      class="mt-2"
      v-if="changeReportDetail?.data && changeReportDetail?.data?.priceChangeItems?.length > 0"
    >
      <v-col class="pa-0 d-flex justify-md-end mb-7">
        <button-with-icon @click="toggleModal()" class="green-bg"
          ><span><img src="@/assets/ticket-it/images/pencil.svg" /></span>
          <p>Create Batch</p></button-with-icon
        >
      </v-col>
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th>SKUs</th>
            <th>Description</th>
            <th>Change Field</th>
            <th>Prev Value</th>
            <th>Latest Value</th>
            <th>Date Changed</th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody>
            <tr v-for="(tableData, i) in changeReportDetail?.data?.priceChangeItems" :key="i">
              <td class="pa-0">
                <span class="pa-2 td-max-width">{{ tableData?.sku }}</span>
              </td>
              <td class="pa-0">
                <span class="pa-2 td-max-width">{{ tableData?.description }}</span>
              </td>
              <td class="pa-0">
                <span class="pa-2 td-max-width">{{ tableData?.reportFieldName }}</span>
              </td>
              <td class="pa-0">
                <span class="pa-2 td-max-width">{{ tableData?.oldValue }}</span>
              </td>
              <td class="pa-0">
                <span class="pa-2 td-max-width">{{ tableData?.newValue }}</span>
              </td>
              <td class="pa-0">
                <span class="pa-2 td-max-width">{{ formatDateTime(tableData?.dateChanged) }}</span>
              </td>
            </tr>
          </tbody>
        </template>
      </table-structure>
    </v-col>
  </v-col>

  <create-report-batch v-if="modalStatus" v-on:closeModal="toggleModal" />
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import NavigationBar from '@/components/ticket-it/navigations/NavigationBar.vue'
import { validationSchema } from '@/core/ticket-it/validations/ChangeReport.js'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'
import { ApiformatDate, ApiformatTime, formatDateTime } from '@/core/ticket-it/global/Utils.js'
import TableStructure from '@/components/ticket-it/table/TableStructure.vue'
import CreateReportBatch from '@/views/ticket-it/panel-view/reports/change-report/create-report-batch/CreateReportBatch.vue'

export default defineComponent({
  name: 'change-report',
  components: {
    'navigation-bar': NavigationBar,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    'table-structure': TableStructure,
    'create-report-batch': CreateReportBatch,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup() {
    const loader = ref(true)
    const store = useStore()
    const toast = useToast()
    const firstListData = ref([])
    const secondListData = ref([])
    const thirdListData = ref([])
    const fourthListData = ref([])
    const fifthListData = ref([])
    let modalStatus = ref(false)
    const formData = ref({
      dateFrom: '',
      dateTo: '',
      timeFrom: '',
      timeTo: '',
      changeReport: ''
    })

    store.commit(Mutations.SET_CHANGE_REPORT_DETAIL, null)
    store.commit(Mutations.SET_CHANGE_REPORT_MODAL_LIST, null)

    const errorChangeReport = computed(() => {
      return store.getters.errorChangeReport
    })
    const changeReportList = computed(() => {
      return store.getters.changeReportListSuccess
    })
    const changeReportDetail = computed(() => {
      return store.getters.changeReportDetailSuccess
    })

    const fetchListApi = async () => {
      await store.dispatch(Actions.CHANGE_REPORT_LIST)
    }

    // first multi select
    const firstSelectedList = computed(
      () =>
        firstListData.value?.length === changeReportList.value?.data?.listOfSearchAttribute1?.length
    )
    const addFistMultiselect = () => {
      if (firstSelectedList.value) {
        firstListData.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        firstListData.value = [...changeReportList.value?.data?.listOfSearchAttribute1]
      }
    }

    // second multi select
    const secondSelectedList = computed(
      () =>
        secondListData.value?.length ===
        changeReportList.value?.data?.listOfSearchAttribute2?.length
    )
    const addSecondMultiselect = () => {
      if (secondSelectedList.value) {
        secondListData.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        secondListData.value = [...changeReportList.value?.data?.listOfSearchAttribute2]
      }
    }

    // third multi select
    const thirdSelectedList = computed(
      () =>
        thirdListData.value?.length === changeReportList.value?.data?.listOfSearchAttribute3?.length
    )
    const addThirdMultiselect = () => {
      if (thirdSelectedList.value) {
        thirdListData.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        thirdListData.value = [...changeReportList.value?.data?.listOfSearchAttribute3]
      }
    }

    // fourth multi select
    const fourthSelectedList = computed(
      () =>
        fourthListData.value?.length ===
        changeReportList.value?.data?.listOfSearchAttribute4?.length
    )
    const addFourthMultiselect = () => {
      if (fourthSelectedList.value) {
        fourthListData.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        fourthListData.value = [...changeReportList.value?.data?.listOfSearchAttribute4]
      }
    }

    // fourth multi select
    const fifthSelectedList = computed(
      () =>
        fifthListData.value?.length === changeReportList.value?.data?.listOfSearchAttribute5?.length
    )
    const addFifthMultiselect = () => {
      if (fifthSelectedList.value) {
        fifthListData.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        fifthListData.value = [...changeReportList.value?.data?.listOfSearchAttribute5]
      }
    }

    const submit = async (values) => {
      loader.value = true
      const fromDate = new Date(values?.dateFrom + ' ' + values?.timeFrom)
      const toDate = new Date(values?.dateTo + ' ' + values?.timeTo)
      const fromISOString = `${fromDate.getFullYear()}-${padZero(
        fromDate.getMonth() + 1
      )}-${padZero(fromDate.getDate())}T${padZero(fromDate.getHours())}:${padZero(
        fromDate.getMinutes()
      )}:${padZero(fromDate.getSeconds())}.${fromDate.getMilliseconds()}Z`

      const toISOString = `${toDate.getFullYear()}-${padZero(toDate.getMonth() + 1)}-${padZero(
        toDate.getDate()
      )}T${padZero(toDate.getHours())}:${padZero(toDate.getMinutes())}:${padZero(
        toDate.getSeconds()
      )}.${toDate.getMilliseconds()}Z`
      const payload = {
        dateFrom: fromISOString,
        dateTo: toISOString,
        searchChangeReportId: '',
        timeFrom: fromISOString,
        timeTo: toISOString,
        listChangeReport: [],
        changeReportName: values?.changeReport,
        listOfSearchAttribute1: firstListData.value,
        selectedSearchAttribute1: firstListData.value,
        listOfSearchAttribute2: secondListData.value,
        selectedSearchAttribute2: secondListData.value,
        listOfSearchAttribute3: thirdListData.value,
        selectedSearchAttribute3: thirdListData.value,
        listOfSearchAttribute4: fourthListData.value,
        selectedSearchAttribute4: fourthListData.value,
        listOfSearchAttribute5: fifthListData.value,
        selectedSearchAttribute5: fifthListData.value,
        searchAttributeField1: changeReportList.value?.data?.searchAttributeField1 || '',
        searchAttributeField2: changeReportList.value?.data?.searchAttributeField2 || '',
        searchAttributeField3: changeReportList.value?.data?.searchAttributeField3 || '',
        searchAttributeField4: changeReportList.value?.data?.searchAttributeField4 || '',
        searchAttributeField5: changeReportList.value?.data?.searchAttributeField5 || '',
        priceChangeItems: [
          {
            id: 0,
            sku: '',
            description: '',
            reportFieldName: '',
            oldValue: '',
            newValue: '',
            dateChanged: new Date(),
            searchField1: '',
            searchField2: '',
            searchField3: '',
            searchField4: '',
            searchField5: ''
          }
        ]
      }
      await store.dispatch(Actions.CHANGE_REPORT_DETAIL, payload)
    }

    // use for correct date formatting
    function padZero(num) {
      return num.toString().padStart(2, '0')
    }

    const toggleModal = async () => {
      modalStatus.value = !modalStatus.value
      if (modalStatus.value) {
        const payload = {
          dateFrom: changeReportDetail?.value?.data?.dateFrom,
          dateTo: changeReportDetail?.value?.data?.dateTo,
          reportName: changeReportDetail?.value?.data?.changeReportName,
          searchChangeReportId: changeReportDetail?.value?.data?.searchChangeReportId
        }
        await store.dispatch(Actions.CHANGE_REPORT_MODAL_LIST, payload)
      }
    }

    watch(errorChangeReport, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.error(errorChangeReport.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(changeReportList, (newValue) => {
      if (newValue) {
        loader.value = false
        formData.value.dateFrom = ApiformatDate(newValue?.data?.dateFrom)
        formData.value.dateTo = ApiformatDate(newValue?.data?.dateTo)
        formData.value.timeFrom = ApiformatTime(newValue?.data?.timeFrom)
        formData.value.timeTo = ApiformatTime(newValue?.data?.timeTo)
        formData.value.changeReport = 'All'
      }
    })
    watch(changeReportDetail, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.success(changeReportDetail.value.successMessage, {
          position: 'top-right'
        })
      }
    })

    // Fetch the list api
    fetchListApi()

    return {
      validationSchema,
      submit,
      loader,
      changeReportList,
      formData,
      firstListData,
      addFistMultiselect,
      secondListData,
      addSecondMultiselect,
      thirdListData,
      addThirdMultiselect,
      fourthListData,
      addFourthMultiselect,
      fifthListData,
      addFifthMultiselect,
      changeReportDetail,
      formatDateTime,
      toggleModal,
      modalStatus
    }
  }
})
</script>
