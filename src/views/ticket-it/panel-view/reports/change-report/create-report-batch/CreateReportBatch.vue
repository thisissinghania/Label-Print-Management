<template>
  <popup-area :sizeSM="`12`" :sizeMD="`10`" :sizeLG="`5`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Create From PROMO PRICE Changes</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <v-col class="pa-0 mb-8">
        <table class="w-100 popup-table">
          <thead>
            <tr>
              <th class="text-left">{{ changeReportModalList?.data?.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong class="mr-2">Products: </strong> {{ changeReportModalList?.data?.products }}
              </td>
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
              <Field name="startDate" type="date" placeholder="Select Date" />
            </v-col>
            <ErrorMessage name="startDate" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Date To</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="endDate" type="date" placeholder="Select Date" />
            </v-col>
            <ErrorMessage name="endDate" />
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
import { validationSchema } from '@/core/ticket-it/validations/CreateChangeReport.js'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { formatDate, formatNormalDate } from '@/core/ticket-it/global/Utils.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'create-report-batch',
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

    const errorChangeReport = computed(() => {
      return store.getters.errorChangeReport
    })
    const changeReportModalList = computed(() => {
      return store.getters.changeReportModalListSuccess
    })
    const changeBatchFromReport = computed(() => {
      return store.getters.changeBatchFromReportSuccess
    })

    const submit = async (values) => {
      loader.value = true
      if (values.notes === undefined) {
        values.notes = ''
      }
      const payload = {
        searchChangeReportId: changeReportModalList?.value?.data?.searchChangeReportId,
        products: changeReportModalList?.value?.data?.products,
        datesString: formatNormalDate(new Date()),
        pricesDateFrom: changeReportModalList?.value?.data?.pricesDateFrom,
        pricesDateTo: changeReportModalList?.value?.data?.pricesDateTo,
        changeReportName: changeReportModalList?.value?.data?.changeReportName,
        selectedSearchAttribute1: '',
        selectedSearchAttribute2: '',
        selectedSearchAttribute3: '',
        selectedSearchAttribute4: '',
        selectedSearchAttribute5: ''
      }
      values = { ...values, ...payload }
      await store.dispatch(Actions.CHANGE_BATCH_FROM_REPORT, values)
    }

    watch(errorChangeReport, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(changeReportModalList, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(changeBatchFromReport, (newVal) => {
      toast.clear()
      if (newVal) {
        loader.value = false
        toast.success(changeBatchFromReport.value.successMessage, {
          position: 'top-right'
        })
        emit('closeModal')
      }
    })

    return {
      submit,
      validationSchema,
      loader,
      changeReportModalList,
      formatDate
    }
  }
})
</script>
