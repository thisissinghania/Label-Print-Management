<template>
  <popup-area :sizeSM="`12`" :sizeMD="`10`" :sizeLG="`5`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Recall Batch</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <VeeForm id="recall-bacth-form" @submit="submit" :validation-schema="validationSchema">
        <v-row>
          <v-col class="custom-field" cols="12" sm="12" md="12">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Reason</label></v-col>
            <v-col class="field-type pa-0">
              <Field v-slot="{ field }" name="reason">
                <textarea v-bind="field" rows="4" />
              </Field>
            </v-col>
            <ErrorMessage name="reason" />
          </v-col>
        </v-row>
        <v-col class="pa-0 mt-5">
          <button-with-icon class="green-bg"
            ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
            <p>Recall</p></button-with-icon
          >
        </v-col>
      </VeeForm>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref, computed, watch, toRef } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { validationSchema } from '@/core/ticket-it/validations/Reason.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'recall-batch',
  components: {
    'popup-area': Popover,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  props: {
    batchValues: {
      type: Object,
      required: false
    }
  },
  setup(props, { emit }) {
    const loader = ref(false)
    const store = useStore()
    const batchListData = toRef(props, 'batchValues')

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const recallBatch = computed(() => {
      return store.getters.recallBatchSuccess
    })

    const submit = async (values, { resetForm }) => {
      loader.value = true
      const payload = {
        batchId: batchListData.value?.batchId,
        reason: values.reason
      }
      await store.dispatch(Actions.RECALL_BATCH, payload)
      resetForm()
    }

    watch(errorBatch, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(recallBatch, (newValue) => {
      if (newValue) {
        loader.value = false
        emit('closeModal')
      }
    })

    return {
      validationSchema,
      submit,
      loader,
      batchListData
    }
  }
})
</script>
