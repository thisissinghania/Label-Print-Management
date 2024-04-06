<template>
  <popup-area :sizeSM="`12`" :sizeMD="`8`" :sizeLG="`6`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Customise Adhoc Ticket</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <VeeForm
        id="customise-ticket-form"
        ref="ticketFormData"
        @submit="submit"
        @change="changePreviewData"
        v-if="!loader"
      >
        <v-row v-if="singleTicketEdit?.data">
          <!-- left-part -->
          <v-col cols="12" sm="6">
            <v-row>
              <v-col
                v-for="(value, fieldName) in singleTicketEdit?.data?.formModel?.fields"
                :key="fieldName"
                class="custom-field"
                cols="12"
              >
                <v-col class="pa-0 mb-1 field-label bold-label">
                  <label>{{ fieldName }}</label>
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="singleTicketEdit?.data?.formModel?.types[fieldName] == 1"
                >
                  <Field
                    :name="fieldName"
                    type="text"
                    v-if="value && !allListItemsData[fieldName]"
                    :value="value"
                  />
                  <Field
                    :name="fieldName"
                    type="text"
                    v-else-if="allListItemsData[fieldName]"
                    v-model="allListItemsData[fieldName]"
                  />
                  <Field :name="fieldName" type="text" v-else :value="value" />
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="singleTicketEdit?.data?.formModel?.types[fieldName] == 2"
                >
                  <Field
                    v-slot="{ field }"
                    :name="fieldName"
                    v-if="value && !allListItemsData[fieldName]"
                    :value="value"
                  >
                    <textarea v-bind="field"></textarea>
                  </Field>
                  <Field
                    v-slot="{ field }"
                    :name="fieldName"
                    v-else-if="allListItemsData[fieldName]"
                    v-model="allListItemsData[fieldName]"
                  >
                    <textarea v-bind="field"></textarea>
                  </Field>
                  <Field v-slot="{ field }" :name="fieldName" v-else :value="value">
                    <textarea v-bind="field"></textarea>
                  </Field>
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="singleTicketEdit?.data?.formModel?.types[fieldName] == 3"
                >
                  <Field
                    :name="fieldName"
                    type="date"
                    v-if="value && !allListItemsData[fieldName]"
                    :value="value"
                  />
                  <Field
                    :name="fieldName"
                    type="date"
                    v-else-if="allListItemsData[fieldName]"
                    v-model="allListItemsData[fieldName]"
                  />
                  <Field :name="fieldName" type="date" v-else :value="value" />
                </v-col>
                <v-col
                  class="field-type field-stype-select pa-0"
                  v-if="singleTicketEdit?.data?.formModel?.types[fieldName] == 4"
                >
                  <Field
                    :name="fieldName"
                    as="select"
                    v-if="value && !allListItemsData[fieldName]"
                    :value="value"
                  >
                    <option value="" disabled>Select Action</option>
                    <option
                      :value="titles"
                      :key="titles"
                      v-for="(val, titles) in singleTicketEdit?.data?.formModel?.lists[fieldName]"
                    >
                      {{ titles }}
                    </option>
                  </Field>
                  <Field
                    :name="fieldName"
                    as="select"
                    v-else-if="allListItemsData[fieldName]"
                    v-model="allListItemsData[fieldName]"
                  >
                    <option value="" disabled>Select Action</option>
                    <option
                      :value="titles"
                      :key="titles"
                      v-for="(val, titles) in singleTicketEdit?.data?.formModel?.lists[fieldName]"
                    >
                      {{ titles }}
                    </option>
                  </Field>
                  <Field :name="fieldName" as="select" v-else :value="value">
                    <option value="" disabled>Select Action</option>
                    <option
                      :value="titles"
                      :key="titles"
                      v-for="(val, titles) in singleTicketEdit?.data?.formModel?.lists[fieldName]"
                    >
                      {{ titles }}
                    </option>
                  </Field>
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="singleTicketEdit?.data?.formModel?.types[fieldName] == 5"
                >
                  <div class="end-search-icon searchable-field">
                    <Field
                      :name="fieldName"
                      v-slot="{ field }"
                      v-if="value && !allListItemsData[fieldName]"
                      :value="value"
                    >
                      <v-combobox
                        v-bind="field"
                        v-model="formValues[fieldName]"
                        @keyup="onComboboxChange(fieldName, $event)"
                        @change="onComboboxChange(fieldName, $event)"
                        :items="allListItems.map((items) => items.label)"
                        variant="outlined"
                        :hide-no-data="false"
                        no-data-text="Search for a keyword"
                      ></v-combobox>
                    </Field>
                    <Field
                      :name="fieldName"
                      v-slot="{ field }"
                      v-else-if="allListItemsData[fieldName]"
                      v-model="allListItemsData[fieldName]"
                    >
                      <v-combobox
                        v-bind="field"
                        v-model="formValues[fieldName]"
                        @keyup="onComboboxChange(fieldName, $event)"
                        @change="onComboboxChange(fieldName, $event)"
                        :items="allListItems.map((items) => items.label)"
                        variant="outlined"
                        :hide-no-data="false"
                        no-data-text="Search for a keyword"
                      ></v-combobox>
                    </Field>
                    <Field :name="fieldName" v-slot="{ field }" v-else :value="value">
                      <v-combobox
                        v-bind="field"
                        v-model="formValues[fieldName]"
                        @keyup="onComboboxChange(fieldName, $event)"
                        @change="onComboboxChange(fieldName, $event)"
                        :items="allListItems.map((items) => items.label)"
                        variant="outlined"
                        :hide-no-data="false"
                        no-data-text="Search for a keyword"
                      ></v-combobox>
                    </Field>
                    <button class="search_icon" type="button">
                      <svg-icon
                        type="mdi"
                        :path="mdiMagnify"
                        v-if="!loadingSearchValues[fieldName]"
                      ></svg-icon>
                      <v-progress-circular
                        v-else
                        indeterminate
                        color="default"
                      ></v-progress-circular>
                    </button>
                  </div>
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="singleTicketEdit?.data?.formModel?.types[fieldName] == 6"
                >
                  <Field
                    :name="fieldName"
                    type="text"
                    v-if="value && !allListItemsData[fieldName]"
                    :value="value"
                  />
                  <Field
                    :name="fieldName"
                    type="text"
                    v-else-if="allListItemsData[fieldName]"
                    v-model="allListItemsData[fieldName]"
                  />
                  <Field :name="fieldName" type="text" v-else :value="value" />
                </v-col>
                <v-col
                  class="field-type pa-0"
                  v-if="singleTicketEdit?.data?.formModel?.types[fieldName] == 7"
                >
                  <div class="end-search-icon searchable-field">
                    <Field
                      :name="fieldName"
                      v-slot="{ field }"
                      v-if="value && !allListItemsData[fieldName]"
                      :value="value"
                    >
                      <v-combobox
                        v-bind="field"
                        v-model="formValues[fieldName]"
                        @keyup="onComboboxChange(fieldName, $event)"
                        @change="onComboboxChange(fieldName, $event)"
                        :items="allListItems.map((items) => items.label)"
                        variant="outlined"
                        :hide-no-data="false"
                        no-data-text="Search for a keyword"
                      ></v-combobox>
                    </Field>
                    <Field
                      :name="fieldName"
                      v-slot="{ field }"
                      v-else-if="allListItemsData[fieldName]"
                      v-model="allListItemsData[fieldName]"
                    >
                      <v-combobox
                        v-bind="field"
                        v-model="formValues[fieldName]"
                        @keyup="onComboboxChange(fieldName, $event)"
                        @change="onComboboxChange(fieldName, $event)"
                        :items="allListItems.map((items) => items.label)"
                        variant="outlined"
                        :hide-no-data="false"
                        no-data-text="Search for a keyword"
                      ></v-combobox>
                    </Field>
                    <Field :name="fieldName" v-slot="{ field }" v-else :value="value">
                      <v-combobox
                        v-bind="field"
                        v-model="formValues[fieldName]"
                        @keyup="onComboboxChange(fieldName, $event)"
                        @change="onComboboxChange(fieldName, $event)"
                        :items="allListItems.map((items) => items.label)"
                        variant="outlined"
                        :hide-no-data="false"
                        no-data-text="Search for a keyword"
                      ></v-combobox>
                    </Field>
                    <button class="search_icon" type="button">
                      <svg-icon
                        type="mdi"
                        :path="mdiMagnify"
                        v-if="!loadingSearchValues[fieldName]"
                      ></svg-icon>
                      <v-progress-circular
                        v-else
                        indeterminate
                        color="default"
                      ></v-progress-circular>
                    </button>
                  </div>
                </v-col>
                <v-col
                  class="field-type field-stype-select pa-0"
                  v-if="singleTicketEdit?.data?.formModel?.types[fieldName] == 8"
                >
                  <Field
                    :name="fieldName"
                    as="select"
                    v-if="value && !allListItemsData[fieldName]"
                    :value="value"
                  >
                    <option value="" disabled>Select Action</option>
                    <option
                      :value="titles"
                      :key="titles"
                      v-for="(val, titles) in singleTicketEdit?.data?.formModel?.lists[fieldName]"
                    >
                      {{ titles }}
                    </option>
                  </Field>
                  <Field
                    :name="fieldName"
                    as="select"
                    v-else-if="allListItemsData[fieldName]"
                    v-model="allListItemsData[fieldName]"
                  >
                    <option value="" disabled>Select Action</option>
                    <option
                      :value="titles"
                      :key="titles"
                      v-for="(val, titles) in singleTicketEdit?.data?.formModel?.lists[fieldName]"
                    >
                      {{ titles }}
                    </option>
                  </Field>
                  <Field :name="fieldName" as="select" v-else :value="value">
                    <option value="" disabled>Select Action</option>
                    <option
                      :value="titles"
                      :key="titles"
                      v-for="(val, titles) in singleTicketEdit?.data?.formModel?.lists[fieldName]"
                    >
                      {{ titles }}
                    </option>
                  </Field>
                </v-col>
              </v-col>

              <v-col cols="12" class="mt-1" v-if="singleTicketEdit?.data?.formModel?.fields">
                <v-col cols="12" class="pa-0">
                  <button-with-icon class="green-bg"
                    ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
                    <p>Save Changes</p></button-with-icon
                  >
                </v-col>
              </v-col>
            </v-row>
          </v-col>

          <!-- right-part -->
          <v-col cols="12" sm="6">
            <v-row>
              <v-col class="custom-field" cols="12">
                <v-col class="pa-0" :style="{ height: setDivHeight + 'px' }">
                  <div class="preview-ticket" v-if="singleTicketView?.data?.tickets.length > 0">
                    <div class="preview">
                      <div class="pagination-centered pagination-top"></div>
                      <div class="canvas-wrapper" ref="canvasWrapper"></div>
                      <div class="pagination-centered pagination-bottom"></div>
                    </div>
                  </div>
                </v-col>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-col class="pa-0" v-else>
          <v-col class="no-batch pa-5 text-center">
            <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
            <p>No Data Available</p>
          </v-col>
        </v-col>
      </VeeForm>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref, computed, watch, toRef, reactive } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { Form as VeeForm, Field } from 'vee-validate'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { IMG_BASE_URL } from '@/store/ticket-it/BaseUrl'
import { formatDateTime } from '@/core/ticket-it/global/Utils.js'
import { mdiMagnify } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'adhoc-customize-ticket',
  components: {
    'popup-area': Popover,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    SvgIcon
  },
  props: {
    ticketId: {
      type: String,
      required: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const loader = ref(true)
    const ticketIdVal = toRef(props, 'ticketId')
    const canvasWrapper = ref(null)
    const ticketFormData = ref(null)
    const setDivHeight = ref('')
    const formValues = reactive({})
    const loadingSearchValues = reactive({})
    const allListItems = ref([])
    const toast = useToast()
    let selectedId = ref('')
    const allListItemsData = ref({})

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const singleTicketEdit = computed(() => {
      return store.getters.adhocSingleTicketEditSuccess
    })
    const updateTicketSuccess = computed(() => {
      return store.getters.createAdhocTicketSuccess
    })
    const singleTicketView = computed(() => {
      return store.getters.adhocTemplatePreviewSuccess
    })
    const setSearchableFields = computed(() => {
      return store.getters.setSearchableFieldsSuccess
    })
    const setSearchableFieldsData = computed(() => {
      return store.getters.setSearchableFieldsDataSuccess
    })

    // set default key and values if not exist
    const setDefaultValues = (payload, formModelFields) => {
      if (!formModelFields || typeof formModelFields !== 'object') {
        return ''
      }
      for (const [key, value] of Object.entries(formModelFields)) {
        if (typeof value === 'object') {
          payload[key] = setDefaultValues(payload[key] || {}, value)
        } else {
          payload[key] = payload[key] || ''
        }
      }
      return payload
    }

    const submit = async (values) => {
      loader.value = true
      values.Id = `${singleTicketEdit?.value?.data?.id}`
      const formModelFields = singleTicketEdit.value?.data?.formModel?.fields
      const dataWithDefaults = setDefaultValues(values, formModelFields)
      const params = {
        adhocEditKeys: dataWithDefaults,
        templateName: singleTicketEdit?.value?.data?.templateName
      }
      await store.dispatch(Actions.CREATE_ADHOC_TICKET, params)
    }

    const changePreviewData = () => {
      previewApiFunction(ticketFormData.value.getValues())
    }

    const previewApiFunction = async (allPayload) => {
      const batch = new URLSearchParams(window.location.search).get('batchId')
      const formModelFields = singleTicketEdit.value?.data?.formModel?.fields
      const payloadWithDefaults = setDefaultValues(allPayload, formModelFields)

      await store.dispatch(Actions.ADHOC_TEMPLATE_PREVIEW, {
        templateName: singleTicketEdit?.value?.data?.templateName,
        batchId: batch,
        payload: payloadWithDefaults
      })
    }

    const renderTicket = () => {
      singleTicketView.value.data.resourcePath = `${IMG_BASE_URL}${singleTicketView.value.data.resourcePath}`
      // eslint-disable-next-line no-undef
      TicketIt.render(singleTicketView.value.data, (err, pages) => {
        if (err) {
          console.error(err)
          return
        }
        pages.forEach((page) => {
          canvasWrapper.value.innerHTML = ''
          canvasWrapper.value.appendChild(page)
        })
      })
    }

    const onComboboxChange = async (fieldName, event) => {
      if (event.target.value?.length > 1) {
        loadingSearchValues[fieldName] = true
        await store.dispatch(Actions.SEARCHABLE_FIELDS, {
          query: event.target.value,
          coreKey: [fieldName],
          templateName: singleTicketEdit?.value?.data?.templateName
        })
      } else {
        allListItems.value = []
      }
      const newValue = event.target.value
      const currentFormValues = ticketFormData.value.getValues()
      const updatedFormValues = { ...currentFormValues, [fieldName]: newValue }
      ticketFormData.value.setValues(updatedFormValues)
      selectedId.value = allListItems.value.find((item) => item.label === newValue)?.id
    }

    const getAllFieldsData = async () => {
      allListItems.value = []
      await store.dispatch(Actions.SEARCHABLE_FIELDS_DATA, {
        coreKey: selectedId.value,
        templateName: singleTicketEdit.value?.data?.templateName
      })
    }

    watch(errorBatch, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(singleTicketEdit, (newVal) => {
      if (newVal) {
        loader.value = false
        previewApiFunction(singleTicketEdit?.value?.data?.formModel?.fields)
      }
    })
    watch(updateTicketSuccess, (newVal) => {
      if (newVal) {
        loader.value = false
        emit('closeModal')
      }
    })
    watch(singleTicketView, (newVal) => {
      if (newVal) {
        loader.value = false
        renderTicket()
        setDivHeight.value = singleTicketView.value?.data?.pageSettings?.height + 50
      }
    })
    watch(setSearchableFields, (newVal) => {
      toast.clear()
      if (newVal) {
        for (const fieldName in loadingSearchValues) {
          loadingSearchValues[fieldName] = false
        }

        const parsedData = JSON.parse(setSearchableFields.value?.data)
        allListItems.value = parsedData?.suggestions.map((item) => item.data)
      }
    })
    watch(selectedId, (newVal) => {
      if (newVal) {
        ticketFormData.value.resetForm()
        setTimeout(() => {
          getAllFieldsData()
        }, 1000)
      }
    })
    watch(setSearchableFieldsData, (newVal) => {
      if (newVal) {
        const parsedValueData = JSON.parse(setSearchableFieldsData.value?.data)
        allListItemsData.value = parsedValueData
        setTimeout(() => {
          previewApiFunction(ticketFormData.value.getValues())
        }, 1000)
      }
    })

    return {
      submit,
      mdiMagnify,
      loader,
      singleTicketEdit,
      canvasWrapper,
      singleTicketView,
      ticketIdVal,
      changePreviewData,
      ticketFormData,
      formatDateTime,
      setDivHeight,
      onComboboxChange,
      loadingSearchValues,
      allListItems,
      formValues,
      allListItemsData
    }
  }
})
</script>
