<template>
  <popup-area :sizeSM="`12`" :sizeMD="`10`" :sizeLG="`5`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Create Batch from {{ posPromotionList?.data?.integrationName }}</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <v-col class="pa-0 mb-8">
        <table class="w-100 popup-table">
          <thead>
            <tr>
              <th colspan="2">{{ posPromotionModalList?.data?.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Dates</strong></td>
              <td>
                {{ posPromotionModalList?.data?.datesString }}
              </td>
            </tr>
            <tr>
              <td><strong>Products</strong></td>
              <td>{{ posPromotionModalList?.data?.products }}</td>
            </tr>
            <tr>
              <td><strong>Notes</strong></td>
              <td>{{ posPromotionModalList?.data?.notes }}</td>
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
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'create-pos-promotion-batch',
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

    const errorPosPromotion = computed(() => {
      return store.getters.errorPosPromotion
    })
    const posPromotionList = computed(() => {
      return store.getters.posPromotionListSuccess
    })
    const posPromotionModalList = computed(() => {
      return store.getters.posPromotionModalListSuccess
    })
    const posPromotionBatch = computed(() => {
      return store.getters.posPromotionBatchSuccess
    })

    const submit = async (values) => {
      loader.value = true
      if (values.notes === undefined) {
        values.notes = ''
      }
      const additionalValues = {
        poDbID: posPromotionModalList.value?.data?.poDbID,
        integrationName: posPromotionModalList.value?.data?.integrationName,
        promoId: posPromotionModalList.value?.data?.promoId,
        startDate: values.dateFrom,
        endDate: values.dateTo,
        products: posPromotionModalList.value?.data?.products,
        datesString: posPromotionModalList.value?.data?.datesString,
        inventoryDBId: posPromotionModalList.value?.data?.inventoryDBId,
        itoId: posPromotionModalList.value?.data?.itoId,
        printedBatchId: posPromotionModalList.value?.data?.printedBatchId,
        id: posPromotionList.value?.data?.integrationName
      }
      values = { ...values, ...additionalValues }
      await store.dispatch(Actions.POS_PROMOTION_BATCH, values)
    }

    watch(errorPosPromotion, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(posPromotionModalList, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(posPromotionBatch, (newVal) => {
      toast.clear()
      if (newVal) {
        loader.value = false
        toast.success(posPromotionBatch.value.successMessage, {
          position: 'top-right'
        })
        emit('closeModal')
      }
    })

    return {
      submit,
      validationSchema,
      loader,
      posPromotionList,
      posPromotionModalList
    }
  }
})
</script>
