<template>
  <popup-area :sizeSM="`12`" :sizeMD="`10`" :sizeLG="`7`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Set Quantities</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <VeeForm id="set-quantity-form" @submit="submit">
        <v-row>
          <v-col
            class="custom-field"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(quantityList, i) in allQuantitiesView?.data?.tickets[0]?.quantities"
            :key="i"
          >
            <v-col class="pa-0 mb-1 field-label bold-label"
              ><label>{{ quantityList?.ticketName }}</label></v-col
            >
            <v-col class="field-type pa-0">
              <Field :name="quantityList?.ticketName" type="text" value="0" />
            </v-col>
          </v-col>
        </v-row>
        <v-col class="pa-0 mt-5 d-flex justify-end">
          <button-with-icon class="dark-yellow"
            ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
            <p>Set Quantities</p></button-with-icon
          >
        </v-col>
      </VeeForm>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, toRef, computed, watch, ref } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { Form as VeeForm, Field } from 'vee-validate'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'create-batch',
  components: {
    'popup-area': Popover,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    VeeForm,
    Field
  },
  props: {
    allQuantities: {
      type: Object,
      required: false
    },
    selectedRows: {
      type: Array,
      required: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const toast = useToast()
    const loader = ref(false)
    const allQuantitiesView = toRef(props, 'allQuantities')
    const selectedRow = toRef(props, 'selectedRows')

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const bulkSetQuantity = computed(() => {
      return store.getters.bulkSetQuantitySuccess
    })

    const submit = async (values) => {
      loader.value = true
      const batch = new URLSearchParams(window.location.search).get('batchId')
      const data = {
        batchId: batch,
        ticketGuids: selectedRow.value,
        ticketQuantities: values
      }
      await store.dispatch(Actions.BULK_SET_QUANTITIES, data)
    }

    watch(errorBatch, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(bulkSetQuantity, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        emit('closeModal')
      }
    })

    return {
      submit,
      allQuantitiesView,
      loader
    }
  }
})
</script>
