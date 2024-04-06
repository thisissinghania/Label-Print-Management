<template>
  <v-col class="pa-0">
    <navigation-bar />
    <page-loader v-if="loader" />

    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12">
          <v-col class="pa-0 subpage-title">Create Inventory</v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="mt-2">
      <v-col class="shadow-block pa-md-5">
        <VeeForm id="create-inventory" @submit="submit">
          <v-row>
            <v-col
              class="custom-field"
              cols="12"
              sm="6"
              v-if="inventoryList?.data?.listOfSearchAttribute1.length > 0"
            >
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>{{ inventoryList?.data?.searchAttributeField1 }}</label></v-col
              >
              <v-col class="pa-0 field-multi-select">
                <Field name="type1" v-slot="{ multiFieldFirst }" v-model="firstListData">
                  <v-select
                    v-bind="multiFieldFirst"
                    v-model="firstListData"
                    :items="inventoryList?.data?.listOfSearchAttribute1"
                    label="Select"
                    multiple
                  >
                    <template #prepend-item>
                      <v-list-item title="Select All" @click="addFistMultiselect">
                        <template #prepend>
                          <v-checkbox-btn></v-checkbox-btn>
                        </template>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                    </template>
                  </v-select>
                </Field>
              </v-col>
            </v-col>

            <v-col
              class="custom-field"
              cols="12"
              sm="6"
              v-if="inventoryList?.data?.listOfSearchAttribute2.length > 0"
            >
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>{{ inventoryList?.data?.searchAttributeField2 }}</label></v-col
              >
              <v-col class="pa-0 field-multi-select">
                <Field name="type2" v-slot="{ multiFieldSecond }" v-model="secondListData">
                  <v-select
                    v-bind="multiFieldSecond"
                    v-model="secondListData"
                    :items="inventoryList?.data?.listOfSearchAttribute2"
                    label="Select"
                    multiple
                  >
                    <template #prepend-item>
                      <v-list-item title="Select All" @click="addSecondMultiselect">
                        <template #prepend>
                          <v-checkbox-btn></v-checkbox-btn>
                        </template>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                    </template>
                  </v-select>
                </Field>
              </v-col>
            </v-col>

            <v-col
              class="custom-field"
              cols="12"
              sm="6"
              v-if="inventoryList?.data?.listOfSearchAttribute3.length > 0"
            >
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>{{ inventoryList?.data?.searchAttributeField3 }}</label></v-col
              >
              <v-col class="pa-0 field-multi-select">
                <Field name="type3" v-slot="{ multiFieldThird }" v-model="thirdListData">
                  <v-select
                    v-bind="multiFieldThird"
                    v-model="thirdListData"
                    :items="inventoryList?.data?.listOfSearchAttribute3"
                    label="Select"
                    multiple
                  >
                    <template #prepend-item>
                      <v-list-item title="Select All" @click="addThirdMultiselect">
                        <template #prepend>
                          <v-checkbox-btn></v-checkbox-btn>
                        </template>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                    </template>
                  </v-select>
                </Field>
              </v-col>
            </v-col>

            <v-col
              class="custom-field"
              cols="12"
              sm="6"
              v-if="inventoryList?.data?.listOfSearchAttribute4.length > 0"
            >
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>{{ inventoryList?.data?.searchAttributeField4 }}</label></v-col
              >
              <v-col class="pa-0 field-multi-select">
                <Field name="type4" v-slot="{ multiFieldFourth }" v-model="fourthListData">
                  <v-select
                    v-bind="multiFieldFourth"
                    v-model="fourthListData"
                    :items="inventoryList?.data?.listOfSearchAttribute4"
                    label="Select"
                    multiple
                  >
                    <template #prepend-item>
                      <v-list-item title="Select All" @click="addFourthMultiselect">
                        <template #prepend>
                          <v-checkbox-btn></v-checkbox-btn>
                        </template>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                    </template>
                  </v-select>
                </Field>
              </v-col>
            </v-col>

            <v-col
              class="custom-field"
              cols="12"
              sm="6"
              v-if="inventoryList?.data?.listOfSearchAttribute5.length > 0"
            >
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>{{ inventoryList?.data?.searchAttributeField5 }}</label></v-col
              >
              <v-col class="pa-0 field-multi-select">
                <Field name="type5" v-slot="{ multiFieldFifth }" v-model="fifthListData">
                  <v-select
                    v-bind="multiFieldFifth"
                    v-model="fifthListData"
                    :items="inventoryList?.data?.listOfSearchAttribute5"
                    label="Select"
                    multiple
                  >
                    <template #prepend-item>
                      <v-list-item title="Select All" @click="addFifthMultiselect">
                        <template #prepend>
                          <v-checkbox-btn></v-checkbox-btn>
                        </template>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                    </template>
                  </v-select>
                </Field>
              </v-col>
            </v-col>

            <v-col
              cols="12"
              v-if="
                inventoryList?.data?.listOfSearchAttribute1.length == 0 &&
                inventoryList?.data?.listOfSearchAttribute2.length == 0 &&
                inventoryList?.data?.listOfSearchAttribute3.length == 0 &&
                inventoryList?.data?.listOfSearchAttribute4.length == 0 &&
                inventoryList?.data?.listOfSearchAttribute5.length == 0
              "
            >
              <v-col class="no-batch pa-5 text-center">
                <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
                <p>No Data Available</p>
              </v-col>
            </v-col>

            <v-col
              cols="12"
              v-if="
                inventoryList?.data?.listOfSearchAttribute1.length > 0 ||
                inventoryList?.data?.listOfSearchAttribute2.length > 0 ||
                inventoryList?.data?.listOfSearchAttribute3.length > 0 ||
                inventoryList?.data?.listOfSearchAttribute4.length > 0 ||
                inventoryList?.data?.listOfSearchAttribute5.length > 0
              "
            >
              <button-with-icon class="green-bg"
                ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
                <p>Submit</p></button-with-icon
              >
            </v-col>
          </v-row>
        </VeeForm>
      </v-col>
    </v-col>

    <v-col class="mt-2" v-if="createInventory?.data && createInventory?.data?.searchResult">
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th>SKUs</th>
            <th>Actions</th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody>
            <table-view :tableData="createInventory?.data?.searchResult" />
          </tbody>
        </template>
      </table-structure>
    </v-col>
  </v-col>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { Form as VeeForm, Field } from 'vee-validate'
import NavigationBar from '@/components/ticket-it/navigations/NavigationBar.vue'
import { seasonList } from '@/core/ticket-it/data/seasonList'
import { supplierList } from '@/core/ticket-it/data/supplierList'
import { colourList } from '@/core/ticket-it/data/colourList'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import TableStructure from '@/components/ticket-it/table/TableStructure.vue'
import TableView from '@/views/ticket-it/panel-view/latest-batches/create-inventory/TableView.vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'create-inventory',
  components: {
    'navigation-bar': NavigationBar,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    'table-structure': TableStructure,
    'table-view': TableView,
    VeeForm,
    Field
  },
  setup() {
    const loader = ref(true)
    const store = useStore()
    const toast = useToast()
    const firstListData = ref([])
    const secondListData = ref([])
    const thirdListData = ref([])
    const fourthListData = ref([])
    const fifthListData = ref([])

    store.commit(Mutations.SET_CREATE_INVENTORY, null)
    store.commit(Mutations.SET_INVENTORY_BATCH_MODAL_DATA, null)

    const errorInventory = computed(() => {
      return store.getters.errorInventory
    })
    const inventoryList = computed(() => {
      return store.getters.inventoryListSuccess
    })
    const createInventory = computed(() => {
      return store.getters.createInventorySuccess
    })

    const fetchListApi = async () => {
      const type = new URLSearchParams(window.location.search).get('type')
      const payload = {
        id: type
      }
      await store.dispatch(Actions.INVENTORY_LIST, payload)
    }

    // first multi select
    const firstSelectedList = computed(
      () =>
        firstListData.value?.length === inventoryList.value?.data?.listOfSearchAttribute1?.length
    )
    const addFistMultiselect = () => {
      if (firstSelectedList.value) {
        firstListData.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        firstListData.value = [...inventoryList.value?.data?.listOfSearchAttribute1]
      }
    }

    // second multi select
    const secondSelectedList = computed(
      () =>
        secondListData.value?.length === inventoryList.value?.data?.listOfSearchAttribute2?.length
    )
    const addSecondMultiselect = () => {
      if (secondSelectedList.value) {
        secondListData.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        secondListData.value = [...inventoryList.value?.data?.listOfSearchAttribute2]
      }
    }

    // third multi select
    const thirdSelectedList = computed(
      () =>
        thirdListData.value?.length === inventoryList.value?.data?.listOfSearchAttribute3?.length
    )
    const addThirdMultiselect = () => {
      if (thirdSelectedList.value) {
        thirdListData.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        thirdListData.value = [...inventoryList.value?.data?.listOfSearchAttribute3]
      }
    }

    // fourth multi select
    const fourthSelectedList = computed(
      () =>
        fourthListData.value?.length === inventoryList.value?.data?.listOfSearchAttribute4?.length
    )
    const addFourthMultiselect = () => {
      if (fourthSelectedList.value) {
        fourthListData.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        fourthListData.value = [...inventoryList.value?.data?.listOfSearchAttribute4]
      }
    }

    // fourth multi select
    const fifthSelectedList = computed(
      () =>
        fifthListData.value?.length === inventoryList.value?.data?.listOfSearchAttribute5?.length
    )
    const addFifthMultiselect = () => {
      if (fifthSelectedList.value) {
        fifthListData.value = []
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        fifthListData.value = [...inventoryList.value?.data?.listOfSearchAttribute5]
      }
    }

    const submit = async () => {
      loader.value = true
      const type = new URLSearchParams(window.location.search).get('type')
      const payload = {
        id: 0,
        integrationName: type,
        listOfSearchAttribute1: firstListData.value,
        selectedSearchAttribute1: firstListData.value.join(', '),
        listOfSearchAttribute2: secondListData.value,
        selectedSearchAttribute2: secondListData.value.join(', '),
        listOfSearchAttribute3: thirdListData.value,
        selectedSearchAttribute3: thirdListData.value.join(', '),
        listOfSearchAttribute4: fourthListData.value,
        selectedSearchAttribute4: fourthListData.value.join(', '),
        listOfSearchAttribute5: fifthListData.value,
        selectedSearchAttribute5: fifthListData.value.join(', '),
        searchAttributeField1: inventoryList.value?.data?.searchAttributeField1 || '',
        searchAttributeField2: inventoryList.value?.data?.searchAttributeField2 || '',
        searchAttributeField3: inventoryList.value?.data?.searchAttributeField3 || '',
        searchAttributeField4: inventoryList.value?.data?.searchAttributeField4 || '',
        searchAttributeField5: inventoryList.value?.data?.searchAttributeField5 || '',
        listOfItemSkus: [],
        searchResult: {
          id: 0,
          inventorySearchId: '',
          itemSKUs: '',
          dateModified: new Date()
        }
      }
      await store.dispatch(Actions.CREATE_INVENTORY, payload)
    }

    watch(errorInventory, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.error(errorInventory.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(inventoryList, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(createInventory, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.success(createInventory.value.successMessage, {
          position: 'top-right'
        })
      }
    })

    // Fetch the list api
    fetchListApi()

    return {
      supplierList,
      colourList,
      seasonList,
      addFistMultiselect,
      loader,
      inventoryList,
      firstListData,
      secondListData,
      addSecondMultiselect,
      thirdListData,
      addThirdMultiselect,
      fourthListData,
      addFourthMultiselect,
      fifthListData,
      addFifthMultiselect,
      submit,
      createInventory
    }
  }
})
</script>
