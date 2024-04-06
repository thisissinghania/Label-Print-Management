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
              <Field name="filterFieldName" as="select" @change="selectedEslType($event)">
                <option value="" disabled>ESL Type</option>
                <option value="test 1">test 1</option>
                <option value="test 2">test 2</option>
                <option value="test 3">test 3</option>
              </Field>
            </v-col>
            <ErrorMessage name="filterFieldName" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="4" lg="4">
            <v-col class="field-type field-stype-select pa-0">
              <Field name="filterFieldValue" as="select">
                <option value="" disabled>Ticket Type</option>
                <option value="demo 1">demo 1</option>
                <option value="demo 2">demo 2</option>
                <option value="demo 3">demo 3</option>
              </Field>
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
                    <th>Field Name</th>
                    <th>Field Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tableData, i) in filterList" :key="i">
                    <esl-filter-table
                      :tableData="tableData"
                      :index="i"
                      v-on:removeAppendData="removeAppendData"
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
import { defineComponent, ref } from 'vue'
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import EslFilterTable from '@/views/ticket-it/panel-view/esl-management/data-filter/EslFilterTable.vue'
import { validationSchema } from '@/core/ticket-it/validations/EslFilter.js'
import SaveFilter from '@/views/ticket-it/panel-view/esl-management/data-filter/SaveFilter.vue'
import ShowSaveFilter from '@/views/ticket-it/panel-view/esl-management/data-filter/ShowSaveFilter.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'esl-filter',
  components: {
    'fill-button': FillButton,
    'esl-filter-table': EslFilterTable,
    'save-filter': SaveFilter,
    'show-save-filter': ShowSaveFilter,
    Field,
    VeeForm,
    ErrorMessage
  },
  setup() {
    const filterList = ref([])
    const saveFilterModal = ref(false)
    const showSaveFilterModal = ref(false)
    const store = useStore()

    const appendFilterData = (values, { resetForm }) => {
      filterList.value.push({ ...values })
      resetForm()
    }

    const removeAppendData = (indexVal) => {
      filterList.value.splice(indexVal, 1)
    }

    const selectedEslType = (event) => {
      console.log(event.target.value)
    }

    const submitFilter = () => {
      alert('pending flow')
    }

    const saveFilterData = () => {
      saveFilterModal.value = !saveFilterModal.value
    }

    const showSaveFilterData = async () => {
      showSaveFilterModal.value = !showSaveFilterModal.value
      if (showSaveFilterModal.value) {
        await store.dispatch(Actions.SAVED_FILTER_LIST)
      }
    }

    return {
      validationSchema,
      submitFilter,
      filterList,
      appendFilterData,
      removeAppendData,
      selectedEslType,
      saveFilterData,
      saveFilterModal,
      showSaveFilterData,
      showSaveFilterModal
    }
  }
})
</script>
