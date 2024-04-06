<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <navigation-bar />

    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12" sm="12" md="6">
          <v-col class="pa-0 subpage-title">ESL Management</v-col>
        </v-col>

        <v-col cols="12" sm="12" md="6" class="d-flex flex-wrap justify-md-end">
          <button-with-icon @click="eslAdd()" class="green-bg ma-1"
            ><span><img src="@/assets/ticket-it/images/add.svg" /></span>
            <p>Add ESL</p></button-with-icon
          >
        </v-col>
      </v-row>
    </v-col>

    <v-col class="search-and-filter pt-5 pb-5 mt-2" v-if="eslListDataSuccess?.data?.length > 0">
      <v-row class="align-center">
        <v-col cols="12" sm="12" md="6" class="d-flex flex-wrap">
          <v-col
            class="custom-field search-field-right pa-0 mb-3 mb-md-0"
            cols="12"
            sm="12"
            md="6"
            lg="5"
          >
            <v-col class="field-type pa-0">
              <VeeForm id="search-form" @submit="searchTicketList">
                <Field
                  name="search"
                  type="text"
                  placeholder="Search"
                  v-model="params.searchString"
                />
                <button class="search_icon">
                  <svg-icon type="mdi" :path="mdiMagnify"></svg-icon>
                </button>
              </VeeForm>
            </v-col>
          </v-col>
          <fill-button
            class="light-blue small-font-cta ml-md-3 mr-3 mr-md-0"
            v-if="showAllButton"
            @click="showAllEsl()"
            >Show All ESL</fill-button
          >
          <button type="button" class="filter-icon ml-md-3" @click="showFilter()">
            <img src="@/assets/ticket-it/images/filter.svg" alt="filter" />
            Data Filter
          </button>
        </v-col>

        <v-col
          cols="12"
          sm="12"
          md="6"
          class="d-flex flex-wrap justify-md-end"
          v-if="selectedRows?.length > 0"
        >
          <div class="d-flex flex-wrap">
            <button-with-icon class="dark-yellow ma-1"
              ><span
                ><img src="@/assets/ticket-it/images/lights.png" style="max-width: 20px"
              /></span>
              <p>Flash</p>
              <v-menu activator="parent">
                <v-list>
                  <v-list-item
                    v-for="(item, i) in colorList"
                    :key="i"
                    :value="item.value"
                    @click="flashColor(item.value)"
                  >
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </button-with-icon>

            <button-with-icon class="dark-primary ma-1" @click="deactivateSelectedRows()"
              ><span
                ><img src="@/assets/ticket-it/images/no-hand.png" style="max-width: 20px"
              /></span>
              <p>Disconnect</p></button-with-icon
            >
          </div>
        </v-col>
      </v-row>
    </v-col>

    <!-- filter area start -->
    <esl-filter v-if="showFilterStatus" />
    <!-- filter area end -->

    <v-col class="table-data mb-5" v-if="eslListDataSuccess?.data?.length > 0">
      <v-col class="table-scroll pa-0">
        <table class="custom-table-design" id="eslAvailableTable">
          <thead>
            <tr>
              <th>
                <v-col-auto class="pa-0 w-auto custom_check mr-8 px-5"
                  ><input
                    type="checkbox"
                    name="check0"
                    :checked="checkParentVal"
                    @change="onChangeParentVal()"
                /></v-col-auto>
              </th>
              <th>ESL Barcode</th>
              <th>Model</th>
              <th>Product SKU</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Status</th>
              <th>Last Updated Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(tableData, i) in eslListDataSuccess?.data" :key="i">
              <esl-management-table
                :tableData="tableData"
                :selectedRows="selectedRows"
                :checkParentVal="checkParentVal"
              />
            </template>
          </tbody>
        </table>
      </v-col>
    </v-col>

    <v-col v-else>
      <v-col class="no-batch pa-5 text-center" v-if="showBatchLoading">
        <v-progress-circular :width="4" color="green" indeterminate></v-progress-circular>
        <p class="mt-4">Please Wait...</p>
      </v-col>
      <v-col class="no-batch pa-5 text-center" v-else>
        <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
        <p>No Data Available</p>
      </v-col>
    </v-col>

    <pagination-list :data="eslListDataSuccess" @update-page="updatePage" />
    <add-esl v-if="eslModalAdd" v-on:closeModal="eslAdd" />
  </v-col>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMagnify } from '@mdi/js'
import EslManagementTable from '@/views/ticket-it/panel-view/esl-management/EslManagementTable.vue'
import NavigationBar from '@/components/ticket-it/navigations/NavigationBar.vue'
import PaginationList from '@/components/ticket-it/pagination/paginationList.vue'
import { Field, Form as VeeForm } from 'vee-validate'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import AddEsl from '@/views/ticket-it/panel-view/esl-management/add-esl/AddEsl.vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import EslFilter from '@/views/ticket-it/panel-view/esl-management/data-filter/EslFilter.vue'
import { colorList } from '@/core/ticket-it/data/Colors.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'esl-management',
  components: {
    'esl-management-table': EslManagementTable,
    'pagination-list': PaginationList,
    'page-loader': PageLoader,
    'navigation-bar': NavigationBar,
    'button-with-icon': ButtonWithIcon,
    'add-esl': AddEsl,
    'fill-button': FillButton,
    'esl-filter': EslFilter,
    VeeForm,
    Field,
    SvgIcon
  },
  setup() {
    const showAllButton = ref(false)
    const showFilterStatus = ref(false)
    let checkParentVal = ref(false)
    const showBatchLoading = ref(true)
    const eslModalAdd = ref(false)
    const loader = ref(false)
    const store = useStore()
    const toast = useToast()
    const selectedRows = ref([])
    const params = ref({
      pageNumber: 1,
      pageSize: 10,
      searchString: ''
    })

    const errorEsl = computed(() => {
      return store.getters.errorEsl
    })
    const eslListDataSuccess = computed(() => {
      return store.getters.eslListDataSuccess
    })
    const disconnectEslSuccess = computed(() => {
      return store.getters.disconnectEslSuccess
    })
    const connectEslSuccess = computed(() => {
      return store.getters.connectEslSuccess
    })
    const flashColorSuccess = computed(() => {
      return store.getters.flashColorSuccess
    })
    const selectedRowsLength = computed(() => {
      return selectedRows.value.length
    })

    const fetchListApi = async () => {
      await store.dispatch(Actions.ESL_LIST, params.value)

      setTimeout(() => {
        showBatchLoading.value = false
      }, 5000)
    }
    fetchListApi()

    // pagination select page show limit
    const updatePage = (page, pageSize) => {
      selectedRows.value = []
      params.value.pageNumber = page
      params.value.pageSize = pageSize
      loader.value = true
      fetchListApi()
    }

    const eslAdd = async () => {
      eslModalAdd.value = !eslModalAdd.value
    }

    const searchTicketList = () => {
      if (params.value.searchString) {
        fetchListApi()
        loader.value = true
        showAllButton.value = true
      }
    }

    const showAllEsl = () => {
      fetchListApi()
      loader.value = true
      params.value.searchString = ''
      showAllButton.value = false
    }

    const showFilter = () => {
      showFilterStatus.value = !showFilterStatus.value
    }

    const onChangeParentVal = () => {
      checkParentVal.value = !checkParentVal.value
      if (checkParentVal.value) {
        selectedRows.value = eslListDataSuccess.value?.data?.map((item) => item.priceTagCode)
      } else {
        selectedRows.value = []
      }
    }

    const deactivateSelectedRows = async () => {
      if (window.confirm('Are you sure you want to disconnect the ESL ?')) {
        loader.value = true
        const payload = {
          eslBarCodes: selectedRows.value
        }
        await store.dispatch(Actions.DISCONNECT_ESL, payload)
      }
    }

    const flashColor = async (name) => {
      loader.value = true
      const payload = {
        eslBarCodes: selectedRows.value,
        lightColor: name,
        duration: 15
      }
      await store.dispatch(Actions.FLASH_COLOR, payload)
    }

    watch(selectedRowsLength, (newSelectedRows) => {
      if (newSelectedRows === 0) {
        checkParentVal.value = false
      }
    })

    watch(errorEsl, (newVal) => {
      toast.clear()
      if (newVal) {
        loader.value = false
        toast.error(errorEsl.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(eslListDataSuccess, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(disconnectEslSuccess, (newVal) => {
      toast.clear()
      if (newVal) {
        loader.value = true
        selectedRows.value = []
        fetchListApi()
        toast.success(disconnectEslSuccess.value.successMessage, {
          position: 'top-right'
        })
      }
    })
    watch(connectEslSuccess, (newVal) => {
      toast.clear()
      if (newVal) {
        loader.value = true
        fetchListApi()
        toast.success(connectEslSuccess.value.successMessage, {
          position: 'top-right'
        })
      }
    })
    watch(flashColorSuccess, (newVal) => {
      toast.clear()
      if (newVal) {
        loader.value = false
        selectedRows.value = []
        toast.success(flashColorSuccess.value.successMessage, {
          position: 'top-right'
        })
      }
    })

    return {
      loader,
      updatePage,
      eslListDataSuccess,
      showBatchLoading,
      eslModalAdd,
      eslAdd,
      mdiMagnify,
      showAllButton,
      showFilterStatus,
      showFilter,
      searchTicketList,
      showAllEsl,
      onChangeParentVal,
      selectedRows,
      checkParentVal,
      deactivateSelectedRows,
      params,
      colorList,
      flashColor
    }
  }
})
</script>
