<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <navigation-bar />

    <v-col class="filter-area mt-md-3">
      <v-row class="align-center">
        <v-col class="filter" cols="12" xs="12" sm="12" md="8" lg="7">
          <!-- form start -->
          <VeeForm id="filter-form">
            <v-col class="all-filters">
              <v-row>
                <v-col
                  v-if="roleName === HEAD_OFFICE"
                  class="custom-field pa-0 mt-1 mb-1 mr-sm-0 mr-md-3"
                  cols="12"
                  sm="12"
                  md="5"
                  lg="4"
                >
                  <v-col class="field-type field-stype-select pa-0">
                    <Field name="create" @change="openPage($event)" as="select">
                      <option value="" disabled>Select Action</option>
                      <option
                        v-for="(value, data) in creatingBatchData?.data?.posBatchCreateList"
                        :key="data"
                        :value="data"
                      >
                        {{ value }}
                      </option>
                    </Field>
                  </v-col>
                </v-col>
                <v-col
                  class="custom-field pa-0 mt-1 mb-1 mr-sm-0 mr-md-3"
                  cols="12"
                  sm="12"
                  md="4"
                  lg="3"
                >
                  <v-col class="field-type field-stype-select pa-0">
                    <Field
                      name="batches"
                      as="select"
                      @change="showBatchesByStatus($event)"
                      v-model="params.subStatus"
                    >
                      <option value="" disabled>Batch Status</option>
                      <option value="string">All</option>
                      <option value="active">Active</option>
                      <option value="printed">Printed</option>
                      <!-- <option value="sent">Sent</option> -->
                      <option value="unsend">Recalled</option>
                      <option value="expired">Expired</option>
                    </Field>
                  </v-col>
                </v-col>
              </v-row>
            </v-col>
          </VeeForm>
          <!-- form end -->
        </v-col>
        <v-col class="new-batch-cta d-flex justify-md-end" cols="12" xs="12" sm="12" md="4" lg="5">
          <fill-button
            class="light-blue small-font-cta mr-2"
            v-if="showAllButton"
            @click="showAllBatch()"
            >Show All Batch</fill-button
          >
          <v-col class="custom-field search-field-right pa-0" md="6" lg="5">
            <v-col class="field-type pa-0">
              <VeeForm id="search-form">
                <Field
                  name="search"
                  type="text"
                  placeholder="Search"
                  v-model="params.searchString"
                />
                <button class="search_icon" type="button" @click="searchBatchList()">
                  <svg-icon type="mdi" :path="mdiMagnify"></svg-icon>
                </button>
              </VeeForm>
            </v-col>
          </v-col>

          <div class="ml-3" v-if="roleName === HEAD_OFFICE || roleName === FRANCHISEE">
            <div v-for="(value, data) in creatingBatchData?.data?.posBatchCreateList" :key="data">
              <button-with-icon
                v-if="value == 'Create From Spreadsheet'"
                @click="toggleModal()"
                class="green-bg"
                ><span><img src="@/assets/ticket-it/images/pencil.svg" /></span>
                <p>Create Batch</p></button-with-icon
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <!-- batch listing start -->
    <v-col class="pt-0 latest-batch-list" v-if="batchList?.data && batchList?.data?.length > 0">
      <v-col
        class="single_batch_list pa-0 mb-5 mt-3 mb-sm-7"
        v-for="(batch, i) in batchList.data"
        :key="i"
      >
        <latest-batches-data :batchListData="batch" />
      </v-col>
    </v-col>
    <!-- batch listing end -->

    <v-col v-else>
      <v-col class="no-batch pa-5 text-center" v-if="showBatchLoading">
        <v-progress-circular :width="4" color="green" indeterminate></v-progress-circular>
        <p class="mt-4">Please Wait...</p>
      </v-col>
      <v-col class="no-batch pa-5 text-center" v-else>
        <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
        <p>No Batch Available</p>
      </v-col>
    </v-col>

    <pagination-list :data="batchList" :changeType="params.subStatus" @update-page="updatePage" />
    <create-batch
      v-if="modalStatus"
      v-on:closeModal="toggleModal"
      v-on:fetchLatestBatches="fetchLatestBatches"
    />
  </v-col>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { Form as VeeForm, Field } from 'vee-validate'
import NavigationBar from '@/components/ticket-it/navigations/NavigationBar.vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import PaginationList from '@/components/ticket-it/pagination/paginationList.vue'
import CreateBatch from '@/views/ticket-it/panel-view/latest-batches/create-batch/CreateBatch.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import LatestBatchesData from '@/views/ticket-it/panel-view/latest-batches/LatestBatchesData.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import router from '@/router'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'
import { HEAD_OFFICE, FRANCHISEE } from '@/core/ticket-it/global/globalVariables'
import { getUserData } from '@/core/ticket-it/services/JWTService'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMagnify } from '@mdi/js'

export default defineComponent({
  name: 'latest-batches',
  components: {
    'navigation-bar': NavigationBar,
    'button-with-icon': ButtonWithIcon,
    'pagination-list': PaginationList,
    'create-batch': CreateBatch,
    'latest-batches-data': LatestBatchesData,
    'page-loader': PageLoader,
    'fill-button': FillButton,
    VeeForm,
    Field,
    SvgIcon
  },
  setup() {
    const showBatchLoading = ref(true)
    const loader = ref(false)
    const roleName = getUserData()?.role
    let modalStatus = ref(false)
    const toast = useToast()
    const store = useStore()
    const showAllButton = ref(false)
    const params = ref({
      pageNumber: 1,
      pageSize: 10,
      BatchTypes: [1, 3],
      subStatus: 'active',
      searchString: ''
    })

    const toggleModal = () => {
      modalStatus.value = !modalStatus.value
    }
    const openPage = (event) => {
      const switchType = event.target.value
      if (switchType == 'CreateBatch') {
        modalStatus.value = true
      } else if (switchType == 'CreateChangeReport') {
        router.push(`${TICKET_IT}/reports/change-report`)
      } else if (switchType == 'coreInventory') {
        router.push(`${TICKET_IT}/latest-batches/create-inventory?type=${switchType}`)
      } else if (switchType == 'retailexpressInventory') {
        router.push(`${TICKET_IT}/latest-batches/create-inventory?type=retailexpress`)
      } else if (switchType == 'coreSOH') {
        router.push('/')
      } else if (
        switchType == 'countrhq' ||
        switchType == 'retailexpress' ||
        switchType == 'shopfront' ||
        switchType == 'vend'
      ) {
        router.push(`${TICKET_IT}/latest-batches/create-pos-promotion?type=${switchType}`)
      } else if (switchType == 'emc') {
        router.push('/')
      } else if (switchType == 'kmms') {
        router.push('/')
      } else if (switchType == 'retailexpressOrder') {
        router.push('/?type=retailexpress')
      } else if (switchType == 'retailexpressITO') {
        router.push('/?type=retailexpress')
      } else if (switchType == 'retailexpressPO') {
        router.push(`${TICKET_IT}/latest-batches/create-pos-purchase-order?type=retailexpress}`)
      } else if (switchType == 'shopfrontPO') {
        router.push(`${TICKET_IT}/latest-batches/create-pos-purchase-order?type=shopfront`)
      } else if (switchType == 'vendPO') {
        router.push(`${TICKET_IT}/latest-batches/create-pos-purchase-order?type=vend`)
      } else if (switchType == 'vendOrder') {
        router.push('/?type=retailexpress')
      }
    }

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const batchList = computed(() => {
      return store.getters.batchListData
    })
    const deleteBatchSuccess = computed(() => {
      return store.getters.deleteBatchSuccess
    })
    const recallBatch = computed(() => {
      return store.getters.recallBatchSuccess
    })
    const creatingBatchData = computed(() => {
      return store.getters.creatingBatchMethodsSuccess
    })

    const fetchLatestBatches = async () => {
      await store.dispatch(Actions.BATCH_LIST, params.value)
      loader.value = false

      setTimeout(() => {
        showBatchLoading.value = false
      }, 5000)
    }

    const showBatchesByStatus = async (event) => {
      params.value.pageNumber = 1
      params.value.subStatus = event.target.value || 'string'
      loader.value = true
      await fetchLatestBatches()
    }

    // pagination select page show limit
    const updatePage = (page, pageSize) => {
      params.value.pageNumber = page
      params.value.pageSize = pageSize
      fetchLatestBatches()
      loader.value = true
    }

    const creatingBatchMethods = async () => {
      await store.dispatch(Actions.CREATING_BATCH_METHODS)
    }

    const searchBatchList = async () => {
      loader.value = true
      showAllButton.value = true
      fetchLatestBatches()
    }
    const showAllBatch = () => {
      loader.value = true
      showAllButton.value = false
      params.value.searchString = ''
      fetchLatestBatches()
    }

    watch(errorBatch, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.error(errorBatch.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(batchList, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(recallBatch, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = true
        toast.success(recallBatch.value.successMessage, {
          position: 'top-right'
        })
        fetchLatestBatches()
      }
    })
    watch(deleteBatchSuccess, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = true
        toast.success(deleteBatchSuccess.value.successMessage, {
          position: 'top-right'
        })
        fetchLatestBatches()
      }
    })

    // Calling the batches api
    fetchLatestBatches()
    creatingBatchMethods()

    return {
      batchList,
      toggleModal,
      modalStatus,
      TICKET_IT,
      openPage,
      showBatchesByStatus,
      updatePage,
      roleName,
      HEAD_OFFICE,
      FRANCHISEE,
      loader,
      showBatchLoading,
      params,
      fetchLatestBatches,
      creatingBatchData,
      mdiMagnify,
      searchBatchList,
      showAllBatch,
      showAllButton
    }
  }
})
</script>
