<template>
  <popup-area :sizeSM="`12`" :sizeMD="`8`" :sizeLG="`5`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Common Editable fields</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <VeeForm id="set-quantity-form" @submit="submit" v-if="!loader && ticketEditableFields?.data">
        <table class="custom-table-design custom-field">
          <tbody>
            <tr v-for="(value, fieldName) in ticketEditableFields?.data?.fields" :key="fieldName">
              <td>{{ fieldName }}</td>
              <td>
                <v-col
                  class="field-type pa-0"
                  v-if="ticketEditableFields?.data?.types[fieldName] == 1"
                >
                  <Field :name="fieldName" type="text" value="" />
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="ticketEditableFields?.data?.types[fieldName] == 2"
                >
                  <Field v-slot="{ field }" :name="fieldName" value="">
                    <textarea v-bind="field"></textarea>
                  </Field>
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="ticketEditableFields?.data?.types[fieldName] == 3"
                >
                  <Field :name="fieldName" type="date" value="" />
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="ticketEditableFields?.data?.types[fieldName] == 4"
                >
                  <Field :name="fieldName" as="select">
                    <option value="" disabled>Select Action</option>
                    <option
                      :value="titles"
                      :key="titles"
                      v-for="(val, titles) in ticketEditableFields?.data?.lists[fieldName]"
                    >
                      {{ titles }}
                    </option>
                  </Field>
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="ticketEditableFields?.data?.types[fieldName] == 5"
                >
                  <Field :name="fieldName" type="text" value="" />
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="ticketEditableFields?.data?.types[fieldName] == 6"
                >
                  <Field :name="fieldName" type="text" value="" />
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="ticketEditableFields?.data?.types[fieldName] == 7"
                >
                  <Field :name="fieldName" type="text" value="" />
                </v-col>
                <v-col
                  class="field-type field-stype-select pa-0"
                  v-if="ticketEditableFields?.data?.types[fieldName] == 8"
                >
                  <Field :name="fieldName" as="select">
                    <option value="" disabled>Select Action</option>
                    <option
                      :value="titles"
                      :key="titles"
                      v-for="(val, titles) in ticketEditableFields?.data?.lists[fieldName]"
                    >
                      {{ titles }}
                    </option>
                  </Field>
                </v-col>
              </td>
            </tr>
          </tbody>
        </table>

        <v-col class="pa-0 mt-5 d-flex">
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
import { defineComponent, computed, watch, ref, toRef } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { Form as VeeForm, Field } from 'vee-validate'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'editable-field',
  components: {
    'popup-area': Popover,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    VeeForm,
    Field
  },
  props: {
    selectedRows: {
      type: Array,
      required: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const loader = ref(true)
    const toast = useToast()
    const selectedRow = toRef(props, 'selectedRows')

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const ticketEditableFields = computed(() => {
      return store.getters.ticketEditableFieldsSuccess
    })
    const updateEditableFields = computed(() => {
      return store.getters.updateEditableFieldsSuccess
    })

    const submit = async (values) => {
      loader.value = true
      const batch = new URLSearchParams(window.location.search).get('batchId')
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          // eslint-disable-next-line no-unused-vars
          ([key, value]) => value !== null && value !== undefined && value !== ''
        )
      )
      const payload = {
        batchId: batch,
        ticketGuids: selectedRow.value,
        ticketEditKeyValues: Object.keys(filteredValues).length > 0 ? filteredValues : 'None',
        saveUrl: 'string'
      }
      await store.dispatch(Actions.UPDATE_EDITABLE_FIELDS, payload)
    }

    watch(errorBatch, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
      }
    })
    watch(ticketEditableFields, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
      }
    })
    watch(updateEditableFields, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        emit('closeModal')
      }
    })

    return {
      submit,
      loader,
      ticketEditableFields
    }
  }
})
</script>
