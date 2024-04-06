<template>
  <v-col cols="12">
    <v-col class="table_filter">
      <!-- start add filter -->
      <VeeForm
        id="search-filter-form"
        @submit="appendFilterData"
        :validation-schema="validationSchema"
      >
        <v-row>
          <v-col class="custom-field" cols="12" sm="12" md="4" lg="4">
            <v-col class="field-type field-stype-select pa-0">
              <Field name="filterFieldName" as="select">
                <option value="" disabled>Select Action</option>
                <option :value="data?.value" v-for="(data, i) in allItems" :key="i">
                  {{ data?.text }}
                </option>
              </Field>
            </v-col>
            <ErrorMessage name="filterFieldName" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="4" lg="4">
            <v-col class="field-type pa-0">
              <Field name="filterFieldValue" type="text" placeholder="Filter Text" />
            </v-col>
            <ErrorMessage name="filterFieldValue" />
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4" class="d-flex">
            <fill-button class="green-bg small-font-cta">Add Filter</fill-button>
            <fill-button
              type="button"
              v-if="filterList?.length > 0"
              @click="showSaveFilterData()"
              class="green-bg small-font-cta ml-3"
              >Show Saved Filters</fill-button
            >
          </v-col>
        </v-row>
      </VeeForm>
      <!-- end add filter -->

      <VeeForm id="search-filter-form" @submit="submitFilter" v-if="filterList?.length > 0">
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-col class="bg-white">
              <table class="custom-table-design filter-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Filter Value</th>
                    <th>Exact?</th>
                    <th>Include/Exclude</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tableData, i) in filterList" :key="i">
                    <batch-filter-table
                      :tableData="tableData"
                      :index="i"
                      v-on:removeAppendData="removeAppendData"
                      v-on:onChangeExactVal="onChangeExactVal"
                      v-on:onChangeIncludeVal="onChangeIncludeVal"
                    />
                  </tr>
                </tbody>
              </table>
            </v-col>
          </v-col>

          <v-col cols="12" sm="12" md="12" lg="12" class="d-flex">
            <fill-button class="green-bg small-font-cta">Apply Filter</fill-button>
            <fill-button
              type="button"
              @click="saveFilterData()"
              class="green-bg small-font-cta ml-3"
              >Save Filter</fill-button
            >
          </v-col>
        </v-row>
      </VeeForm>
    </v-col>
  </v-col>

  <save-filter v-if="saveFilterModal" v-on:closeModal="saveFilterData" :filterList="filterList" />
  <show-save-filter v-if="showSaveFilterModal" v-on:closeModal="showSaveFilterData" />
</template>

<script>
import { defineComponent, ref, toRef } from 'vue'
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { validationSchema } from '@/core/ticket-it/validations/BatchFilter.js'
import BatchFilterTable from '@/views/ticket-it/panel-view/batch-summary/data-filter/BatchFilterTable.vue'
import SaveFilter from '@/views/ticket-it/panel-view/batch-summary/data-filter/SaveFilter.vue'
import ShowSaveFilter from '@/views/ticket-it/panel-view/batch-summary/data-filter/ShowSaveFilter.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'batch-filter',
  components: {
    'fill-button': FillButton,
    'batch-filter-table': BatchFilterTable,
    'save-filter': SaveFilter,
    'show-save-filter': ShowSaveFilter,
    Field,
    VeeForm,
    ErrorMessage
  },
  props: {
    allSelectItems: {
      type: Array,
      required: false
    },
    savedFilter: {
      type: Array,
      required: false
    }
  },
  setup(props, { emit }) {
    const allItems = toRef(props, 'allSelectItems')
    const savedFilterList = toRef(props, 'savedFilter')
    const filterList = ref([])
    let saveFilterModal = ref(false)
    let showSaveFilterModal = ref(false)
    const store = useStore()

    const appendFilterData = (values, { resetForm }) => {
      const additionalValues = {
        isExact: false,
        isInclude: false
      }
      values = { ...values, ...additionalValues }
      filterList.value.push({ ...values })
      resetForm()
    }

    const loadSavedFilters = () => {
      savedFilterList.value.forEach((item) => {
        filterList.value.push({ ...item })
      })
    }

    // push data on load
    loadSavedFilters()

    const removeAppendData = (indexVal) => {
      filterList.value.splice(indexVal, 1)
    }

    const onChangeExactVal = (indexVal, newExactValue) => {
      if (newExactValue == 0) {
        filterList.value[indexVal].isExact = true
      } else {
        filterList.value[indexVal].isExact = false
      }
    }
    const onChangeIncludeVal = (indexVal, newIncludeValue) => {
      if (newIncludeValue == 0) {
        filterList.value[indexVal].isInclude = true
      } else {
        filterList.value[indexVal].isInclude = false
      }
    }

    const submitFilter = () => {
      emit('fetchTicket', filterList.value)
    }

    const saveFilterData = () => {
      saveFilterModal.value = !saveFilterModal.value
    }

    const showSaveFilterData = async () => {
      showSaveFilterModal.value = !showSaveFilterModal.value
      if (showSaveFilterModal.value) {
        await store.dispatch(Actions.SAVED_FILTER_LIST)
      } else {
        emit('fetchTicket')
      }
    }

    return {
      validationSchema,
      appendFilterData,
      submitFilter,
      filterList,
      removeAppendData,
      onChangeExactVal,
      onChangeIncludeVal,
      allItems,
      saveFilterData,
      saveFilterModal,
      showSaveFilterData,
      showSaveFilterModal
    }
  }
})
</script>
