<template>
  <popup-area :sizeSM="`12`" :sizeMD="`10`" :sizeLG="`8`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Create Ticket</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>

    <template v-slot:modalContent>
      <v-row>
        <v-col class="custom-field mb-5" cols="12" sm="12" md="12">
          <v-col class="pa-0 mb-1 field-label bold-label"><label>Select Ticket Type</label></v-col>
          <v-col class="field-type field-stype-select pa-0">
            <Field
              name="templateName"
              v-model="templateDefaultName"
              as="select"
              @change="getAllFields($event.target.value)"
            >
              <option
                :value="templateName"
                v-for="templateName in adhocTemplateNames?.data"
                :key="templateName"
              >
                {{ templateName }}
              </option>
            </Field>
          </v-col>
        </v-col>
      </v-row>

      <VeeForm
        id="adhoc-ticket-form"
        @submit="submit"
        ref="ticketFormData"
        @change="changePreviewData"
      >
        <v-row>
          <v-row class="mb-0">
            <!-- form-left -->
            <v-col cols="12" sm="12" md="6">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="pt-0 pb-0"
                  v-for="(value, fieldName) in adhocTicketFields?.data?.formModel?.fields"
                  :key="fieldName"
                >
                  <v-col class="custom-field" cols="12">
                    <v-col class="pa-0 mb-1 field-label bold-label"
                      ><label>{{ fieldName }}</label></v-col
                    >
                    <v-col
                      class="field-type pa-0"
                      v-if="adhocTicketFields?.data?.formModel?.types[fieldName] == 1"
                    >
                      <Field :name="fieldName" type="text" v-if="value" :value="value" />
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
                      v-if="adhocTicketFields?.data?.formModel?.types[fieldName] == 2"
                    >
                      <Field v-slot="{ field }" :name="fieldName" v-if="value" :value="value">
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
                      v-if="adhocTicketFields?.data?.formModel?.types[fieldName] == 3"
                    >
                      <Field :name="fieldName" type="date" v-if="value" :value="value" />
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
                      v-if="adhocTicketFields?.data?.formModel?.types[fieldName] == 4"
                    >
                      <Field :name="fieldName" as="select" v-if="value" :value="value">
                        <option value="" disabled>Select Action</option>
                        <option
                          :value="titles"
                          :key="titles"
                          v-for="(val, titles) in adhocTicketFields?.data?.formModel?.lists[
                            fieldName
                          ]"
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
                          v-for="(val, titles) in adhocTicketFields?.data?.formModel?.lists[
                            fieldName
                          ]"
                        >
                          {{ titles }}
                        </option>
                      </Field>
                      <Field :name="fieldName" as="select" v-else :value="value">
                        <option value="" disabled>Select Action</option>
                        <option
                          :value="titles"
                          :key="titles"
                          v-for="(val, titles) in adhocTicketFields?.data?.formModel?.lists[
                            fieldName
                          ]"
                        >
                          {{ titles }}
                        </option>
                      </Field>
                    </v-col>
                    <v-col
                      class="field-type pa-0"
                      v-if="adhocTicketFields?.data?.formModel?.types[fieldName] == 5"
                    >
                      <div class="end-search-icon searchable-field">
                        <Field :name="fieldName" v-slot="{ field }" v-if="value" :value="value">
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
                      v-if="adhocTicketFields?.data?.formModel?.types[fieldName] == 6"
                    >
                      <Field :name="fieldName" type="text" v-if="value" :value="value" />
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
                      v-if="adhocTicketFields?.data?.formModel?.types[fieldName] == 7"
                    >
                      <div class="end-search-icon searchable-field">
                        <Field :name="fieldName" v-slot="{ field }" v-if="value" :value="value">
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
                      v-if="adhocTicketFields?.data?.formModel?.types[fieldName] == 8"
                    >
                      <Field :name="fieldName" as="select" v-if="value" :value="value">
                        <option value="" disabled>Select Action</option>
                        <option
                          :value="titles"
                          :key="titles"
                          v-for="(val, titles) in adhocTicketFields?.data?.formModel?.lists[
                            fieldName
                          ]"
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
                          v-for="(val, titles) in adhocTicketFields?.data?.formModel?.lists[
                            fieldName
                          ]"
                        >
                          {{ titles }}
                        </option>
                      </Field>
                      <Field :name="fieldName" as="select" v-else :value="value">
                        <option value="" disabled>Select Action</option>
                        <option
                          :value="titles"
                          :key="titles"
                          v-for="(val, titles) in adhocTicketFields?.data?.formModel?.lists[
                            fieldName
                          ]"
                        >
                          {{ titles }}
                        </option>
                      </Field>
                    </v-col>
                  </v-col>
                </v-col>
                <v-col cols="12" class="mt-1" v-if="adhocTicketFields?.data?.formModel?.fields">
                  <v-col cols="12">
                    <button-with-icon class="green-bg"
                      ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
                      <p>Save</p></button-with-icon
                    >
                  </v-col>
                </v-col>
              </v-row>
            </v-col>

            <!-- form-right -->
            <v-col cols="12" sm="12" md="6" :style="{ height: setDivHeight + 'px' }">
              <v-col
                class="pt-0 pb-0"
                v-if="
                  singleTicketView?.data?.tickets.length > 0 &&
                  adhocTicketFields?.data?.formModel?.fields
                "
              >
                <h3 class="mb-3">Preview</h3>
                <v-col cols="12 pa-0" class="text-center">
                  <!-- all canvas data start-->
                  <v-col class="pa-0">
                    <div class="preview-ticket">
                      <div class="preview">
                        <div class="pagination-centered pagination-top"></div>
                        <div class="canvas-wrapper" ref="canvasWrapper"></div>
                        <div class="pagination-centered pagination-bottom"></div>
                      </div>
                    </div>
                  </v-col>
                  <!-- all canvas data end-->
                </v-col>
              </v-col>
            </v-col>
          </v-row>
        </v-row>
      </VeeForm>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, computed, watch, ref, reactive } from 'vue'
import { mdiMagnify } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { Form as VeeForm, Field } from 'vee-validate'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { IMG_BASE_URL } from '@/store/ticket-it/BaseUrl'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'create-ticket',
  components: {
    'popup-area': Popover,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    SvgIcon
  },
  setup() {
    const store = useStore()
    const loader = ref(true)
    const toast = useToast()
    const canvasWrapper = ref(null)
    const ticketFormData = ref(null)
    const formValues = reactive({})
    const setDivHeight = ref('')
    const loadingSearchValues = reactive({})
    const allListItems = ref([])
    const allListItemsData = ref({})
    let selectedId = ref('')
    const templateDefaultName = ref('')

    const errorAdhoc = computed(() => {
      return store.getters.errorAdhoc
    })
    const adhocTemplateNames = computed(() => {
      return store.getters.adhocTemplateNamesSuccess
    })
    const adhocTicketFields = computed(() => {
      return store.getters.adhocTicketFieldsSuccess
    })
    const singleTicketView = computed(() => {
      return store.getters.adhocTemplatePreviewSuccess
    })
    const createAdhocTicket = computed(() => {
      return store.getters.createAdhocTicketSuccess
    })
    const setSearchableFields = computed(() => {
      return store.getters.setSearchableFieldsSuccess
    })
    const setSearchableFieldsData = computed(() => {
      return store.getters.setSearchableFieldsDataSuccess
    })

    const getAllNames = async () => {
      await store.dispatch(Actions.ADHOC_TEMPLATE_NAMES)
    }

    const getAllFields = async (value) => {
      loader.value = true
      // const params = event.target.value
      await store.dispatch(Actions.ADHOC_TICKET_FIELDS, value)
      resetComboboxValues()
    }

    const changePreviewData = () => {
      adhocPreview(ticketFormData.value.getValues())
    }

    // set default key and values if not exist
    const setDefaultValues = (payload, formModelFields) => {
      for (const [key, value] of Object.entries(formModelFields)) {
        if (typeof value === 'object') {
          payload[key] = setDefaultValues(payload[key] || {}, value)
        } else {
          payload[key] = payload[key] || ''
        }
      }
      return payload
    }

    const adhocPreview = async (allPayload) => {
      const batch = new URLSearchParams(window.location.search).get('batchId')
      const formModelFields = adhocTicketFields.value?.data?.formModel?.fields
      const payloadWithDefaults = setDefaultValues(allPayload, formModelFields)

      await store.dispatch(Actions.ADHOC_TEMPLATE_PREVIEW, {
        templateName: adhocTicketFields.value?.data?.templateName,
        batchId: batch,
        payload: payloadWithDefaults
      })
    }

    const submit = async (values, { resetForm }) => {
      loader.value = true
      // eslint-disable-next-line no-unused-vars
      const { templateName, ...data } = values
      const formModelFields = adhocTicketFields.value?.data?.formModel?.fields
      const dataWithDefaults = setDefaultValues(data, formModelFields)
      const params = {
        adhocEditKeys: dataWithDefaults,
        TemplateName: adhocTicketFields.value?.data?.templateName
      }
      await store.dispatch(Actions.CREATE_ADHOC_TICKET, params)
      resetForm()
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
          templateName: adhocTicketFields.value?.data?.templateName
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
        templateName: adhocTicketFields.value?.data?.templateName
      })
    }

    const resetComboboxValues = () => {
      Object.keys(formValues).forEach((fieldName) => {
        formValues[fieldName] = ''
      })
      ticketFormData.value.resetForm()
    }

    watch(errorAdhoc, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(adhocTemplateNames, (newVal) => {
      if (newVal) {
        loader.value = false
        const mapConvert = Object.keys(newVal?.data)[0]
        templateDefaultName.value = mapConvert
        getAllFields(mapConvert)
      }
    })
    watch(adhocTicketFields, (newVal) => {
      if (newVal) {
        loader.value = false
        adhocPreview(adhocTicketFields.value?.data?.formModel?.fields)
      }
    })
    watch(singleTicketView, (newVal) => {
      if (newVal) {
        loader.value = false
        renderTicket()
        setDivHeight.value = singleTicketView.value?.data?.pageSettings?.height + 50
      }
    })
    watch(createAdhocTicket, (newVal) => {
      toast.clear()
      if (newVal) {
        loader.value = false
        adhocPreview(adhocTicketFields.value?.data?.formModel?.fields)
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
        getAllFieldsData()
      }
    })
    watch(setSearchableFieldsData, (newVal) => {
      if (newVal) {
        const parsedValueData = JSON.parse(setSearchableFieldsData.value?.data)
        allListItemsData.value = parsedValueData
        setTimeout(() => {
          adhocPreview(ticketFormData.value.getValues())
        }, 1000)
      }
    })

    // get all names
    getAllNames()

    return {
      submit,
      mdiMagnify,
      loader,
      getAllFields,
      adhocTemplateNames,
      adhocTicketFields,
      singleTicketView,
      canvasWrapper,
      ticketFormData,
      changePreviewData,
      formValues,
      onComboboxChange,
      setDivHeight,
      loadingSearchValues,
      allListItems,
      allListItemsData,
      templateDefaultName
    }
  }
})
</script>
