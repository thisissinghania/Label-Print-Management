<template>
  <popup-area :sizeSM="`12`" :sizeMD="`10`" :sizeLG="`5`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Create Batch from Purchase Order</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <v-col class="pa-0 mb-8">
        <table class="w-100 popup-table">
          <thead>
            <tr>
              <th colspan="2">{{ batchPoDetail?.data?.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Dates</strong></td>
              <td>
                {{ formatDate(batchPoDetail?.data?.startDate) }} -
                {{ formatDate(batchPoDetail?.data?.endDate) }}
              </td>
            </tr>
            <tr>
              <td><strong>Products</strong></td>
              <td>{{ batchPoDetail?.data?.products }}</td>
            </tr>
            <tr>
              <td><strong>Notes</strong></td>
              <td>{{ batchPoDetail?.data?.notes }}</td>
            </tr>
          </tbody>
        </table>
      </v-col>
      <VeeForm id="new-bacth-po-form" @submit="submit" :validation-schema="validationSchema">
        <v-row>
          <v-col class="custom-field" cols="12" sm="12" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Batch Name</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="name" type="text" placeholder="Enter Batch Name" />
            </v-col>
            <ErrorMessage name="name" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Date From</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="dateFrom" type="date" placeholder="Select Date" />
            </v-col>
            <ErrorMessage name="dateFrom" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Date To</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="dateTo" type="date" placeholder="Select Date" />
            </v-col>
            <ErrorMessage name="dateTo" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="12">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Notes</label></v-col>
            <v-col class="field-type pa-0">
              <Field v-slot="{ field }" name="notes">
                <textarea v-bind="field" rows="4" />
              </Field>
            </v-col>
            <ErrorMessage name="notes" />
          </v-col>
        </v-row>
        <v-col class="pa-0 mt-5">
          <button-with-icon class="green-bg"
            ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
            <p>Save</p></button-with-icon
          >
        </v-col>
      </VeeForm>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { validationSchema } from '@/core/ticket-it/validations/CreatePoBatch.js'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { formatDate } from '@/core/ticket-it/global/Utils.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'create-po-batch',
  components: {
    'popup-area': Popover,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup(props, { emit }) {
    const loader = ref(true)
    const toast = useToast()
    const store = useStore()

    const errorPos = computed(() => {
      return store.getters.errorPos
    })
    const batchPoDetail = computed(() => {
      return store.getters.batchPoDetailSuccess
    })
    const createBatchFromPo = computed(() => {
      return store.getters.createBatchFromPoSuccess
    })

    const submit = async (values, { resetForm }) => {
      loader.value = true
      if (values.notes === undefined) {
        values.notes = ''
      }
      const additionalValues = {
        poDbID: batchPoDetail.value?.data?.poDbID,
        integrationName: '',
        promoId: '',
        startDate: values.dateFrom,
        endDate: values.dateTo,
        products: batchPoDetail.value?.data?.products,
        datesString: batchPoDetail.value?.data?.datesString,
        inventoryDBId: batchPoDetail.value?.data?.inventoryDBId,
        itoId: batchPoDetail.value?.data?.itoId,
        printedBatchId: batchPoDetail.value?.data?.printedBatchId
      }
      values = { ...values, ...additionalValues }
      await store.dispatch(Actions.CREATE_BATCH_FROM_PO, values)
      resetForm()
    }

    watch(errorPos, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(batchPoDetail, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(createBatchFromPo, (newVal) => {
      toast.clear()
      if (newVal) {
        loader.value = false
        toast.success(createBatchFromPo.value.successMessage, {
          position: 'top-right'
        })
        emit('closeModal')
      }
    })

    return {
      submit,
      validationSchema,
      loader,
      batchPoDetail,
      formatDate
    }
  }
})
</script>
