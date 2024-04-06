<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <navigation-bar />

    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12">
          <v-col class="pa-0 subpage-title">PO Search</v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="mt-2">
      <v-col class="shadow-block pa-md-5">
        <VeeForm id="change-report" @submit="submit" :validation-schema="validationSchema">
          <v-row>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>Supplier Invoice Number</label></v-col
              >
              <v-col class="field-type pa-0">
                <Field name="supplierInvoiceNo" type="text" v-model="formVal.supplierInvoiceNo" />
              </v-col>
              <ErrorMessage name="supplierInvoiceNo" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>Purchase Order ID</label></v-col
              >
              <v-col class="field-type pa-0">
                <Field name="purchaseOrderId" type="text" v-model="formVal.purchaseOrderId" />
              </v-col>
              <ErrorMessage name="purchaseOrderId" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Date From</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="dateFrom" type="date" v-model="formVal.dateFrom" />
              </v-col>
              <ErrorMessage name="dateFrom" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Date To</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="dateTo" type="date" v-model="formVal.dateTo" />
              </v-col>
              <ErrorMessage name="dateTo" />
            </v-col>

            <v-col>
              <button-with-icon class="green-bg"
                ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
                <p>Submit</p></button-with-icon
              >
            </v-col>
          </v-row>
        </VeeForm>
      </v-col>
    </v-col>

    <v-col class="mt-2" v-if="posPurchaseOrder?.data && posPurchaseOrder?.data.length > 0">
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th>Purchase Order ID</th>
            <th>Supplier Invoice Number</th>
            <th>Last Modified</th>
            <th>SKUs</th>
            <th>Actions</th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody v-for="(tableData, i) in posPurchaseOrder?.data" :key="i">
            <table-view :tableData="tableData" />
          </tbody>
        </template>
      </table-structure>
    </v-col>
  </v-col>
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import NavigationBar from '@/components/ticket-it/navigations/NavigationBar.vue'
import { brandList } from '@/core/ticket-it/data/brandList'
import { seasonList } from '@/core/ticket-it/data/seasonList'
import { supplierList } from '@/core/ticket-it/data/supplierList'
import { colourList } from '@/core/ticket-it/data/colourList'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import TableStructure from '@/components/ticket-it/table/TableStructure.vue'
import { validationSchema } from '@/core/ticket-it/validations/PosPurchase.js'
import TableView from '@/views/ticket-it/panel-view/latest-batches/create-pos-purchase-order/TableView.vue'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import { formatNormalDate, getOneMonthAgo } from '@/core/ticket-it/global/Utils.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'create-pos-purchase-order',
  components: {
    'navigation-bar': NavigationBar,
    'button-with-icon': ButtonWithIcon,
    'table-structure': TableStructure,
    'table-view': TableView,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup() {
    const store = useStore()
    const toast = useToast()
    const loader = ref(false)
    const formVal = ref({
      dateTo: formatNormalDate(new Date()),
      dateFrom: getOneMonthAgo(),
      supplierInvoiceNo: '',
      purchaseOrderId: ''
    })

    store.commit(Mutations.SET_POS_PURCHASE_ORDER, null)
    store.commit(Mutations.SET_BATCH_PO_DETAIL, null)

    const errorPos = computed(() => {
      return store.getters.errorPos
    })
    const posPurchaseOrder = computed(() => {
      return store.getters.posPurchaseOrderSuccess
    })

    const submit = async (values) => {
      loader.value = true
      if (!values.supplierInvoiceNo) {
        values.supplierInvoiceNo = ''
      }
      if (!values.purchaseOrderId) {
        values.purchaseOrderId = ''
      }
      await store.dispatch(Actions.POS_PURCHASE_ORDER, values)
    }

    watch(errorPos, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.error(errorPos.value.errorMessage, {
          position: 'top-right'
        })
        loader.value = false
      }
    })
    watch(posPurchaseOrder, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(posPurchaseOrder.value.successMessage, {
          position: 'top-right'
        })
        loader.value = false
      }
    })

    return {
      validationSchema,
      supplierList,
      colourList,
      brandList,
      seasonList,
      submit,
      posPurchaseOrder,
      loader,
      formVal
    }
  }
})
</script>
