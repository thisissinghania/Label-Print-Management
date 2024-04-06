<template>
  <popup-area :sizeSM="`12`" :sizeMD="`7`" :sizeLG="`4`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Save Filter</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <v-col class="pa-0">
        <VeeForm id="save-filter-form" @submit="submit" :validation-schema="validationSchema">
          <v-row>
            <v-col class="custom-field" cols="12" sm="12" md="12" lg="12">
              <v-col class="field-type pa-0">
                <Field name="filterName" type="text" placeholder="Filter Name" />
              </v-col>
              <ErrorMessage name="filterName" />
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4" class="d-flex">
              <fill-button class="green-bg small-font-cta">Save</fill-button>
            </v-col>
          </v-row>
        </VeeForm>
      </v-col>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref, toRef, computed, watch } from 'vue'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { useStore } from 'vuex'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { validationSchema } from '@/core/ticket-it/validations/SaveFilter.js'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'save-filter',
  components: {
    'popup-area': Popover,
    'page-loader': PageLoader,
    'fill-button': FillButton,
    Field,
    VeeForm,
    ErrorMessage
  },
  props: {
    filterList: {
      type: Array,
      required: false
    }
  },
  setup(props, { emit }) {
    const tableList = toRef(props, 'filterList')
    const store = useStore()
    const loader = ref(false)
    const toast = useToast()

    const saveDataFilter = computed(() => {
      return store.getters.saveDataFilterSuccess
    })

    const submit = async (values) => {
      loader.value = true
      const payload = {
        filterSaveModel: tableList.value,
        filterName: values?.filterName,
        isDefaultFilter: true
      }
      await store.dispatch(Actions.SAVE_DATA_FILTER, payload)
    }

    watch(saveDataFilter, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.success(saveDataFilter.value.successMessage, {
          position: 'top-right'
        })
        emit('closeModal')
      }
    })

    return {
      loader,
      submit,
      validationSchema
    }
  }
})
</script>
