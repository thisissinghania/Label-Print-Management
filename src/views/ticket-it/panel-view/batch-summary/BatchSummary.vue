<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <navigation-bar />

    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12" sm="12" md="6">
          <!-- <v-col class="pa-0 go-back"
            ><router-link class="d-flex align-center" :to="`${TICKET_IT}/latest-batches`"
              ><img src="@/assets/ticket-it/images/go-back.svg" alt="go-back" class="mr-3" />
              back</router-link
            ></v-col
          > -->
          <v-col class="pa-0 subpage-title" v-if="!adhocPageActive">{{
            batchAllTickets?.data?.card?.name
          }}</v-col>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
          class="d-flex flex-wrap justify-md-end"
          v-if="batchAllTickets?.data?.tickets"
        >
          <fill-button class="small-font-cta light-blue ma-1" @click="hideShowZero()"
            ><span v-if="hideShowZeroStatus">Hide Zero Quantities</span>
            <span v-else>Show Zero Quantities</span></fill-button
          >
          <router-link
            v-if="batchAllTickets?.data?.batchActions?.Preview"
            :to="`${TICKET_IT}/preview-all-ticket?batchId=${batchAllTickets?.data?.batchId}`"
            class="custom_fill_cta small-font-cta dark-blue ma-1"
            >{{ batchAllTickets?.data?.batchActions?.Preview }}</router-link
          >
          <button-with-icon v-if="adhocPageActive" @click="createAdhocModal()" class="green-bg ma-1"
            ><span><img src="@/assets/ticket-it/images/pencil.svg" /></span>
            <p>Create Ticket</p></button-with-icon
          >
        </v-col>
      </v-row>
    </v-col>

    <v-col class="search-and-filter pt-5 pb-5 mt-2" v-if="batchAllTickets?.data?.tickets">
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
              <VeeForm id="search-form">
                <Field
                  name="search"
                  type="text"
                  placeholder="Search"
                  v-model="fomVal.searchString"
                />
                <button class="search_icon" type="button" @click="searchTicketList()">
                  <svg-icon type="mdi" :path="mdiMagnify"></svg-icon>
                </button>
              </VeeForm>
            </v-col>
          </v-col>
          <fill-button
            class="light-blue small-font-cta ml-md-3 mr-3 mr-md-0"
            v-if="showAllButton"
            @click="showAllTickets()"
            >Show All Tickets</fill-button
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
          v-if="selectedRows?.length > 0 && batchAllTickets?.data?.selectedActions?.length > 0"
        >
          <div
            class="d-flex flex-wrap"
            v-for="(allActions, i) in batchAllTickets?.data?.selectedActions"
            :key="i"
          >
            <button-with-icon
              v-if="roleName === HEAD_OFFICE && allActions == 'Delete'"
              class="dark-primary ma-1"
              @click="deleteSelectedRows()"
              ><span><img src="@/assets/ticket-it/images/del.svg" /></span>
              <p>{{ allActions }}</p></button-with-icon
            >
            <button-with-icon
              v-if="allActions == 'Print'"
              @click="ticketPrintToggleModal()"
              class="dark-primary light-blue ma-1"
              ><span><img src="@/assets/ticket-it/images/print.svg" /></span>
              <p>{{ allActions }}</p></button-with-icon
            >
            <button-with-icon
              v-if="allActions == 'Set Quantities'"
              @click="quantityToggleModal()"
              class="dark-primary dark-yellow ma-1"
              ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
              <p>{{ allActions }}</p></button-with-icon
            >
            <fill-button
              v-if="allActions == 'Toggle Print Status'"
              class="small-font-cta dark-blue ma-1"
              @click="toggleSelectedRows()"
              >{{ allActions }}</fill-button
            >
            <button-with-icon
              v-if="allActions == 'Edit'"
              class="green-bg ma-1"
              @click="editableTicketsRow()"
              ><span><img src="@/assets/ticket-it/images/pencil.svg" /></span>
              <p>{{ allActions }}</p></button-with-icon
            >
          </div>
        </v-col>
      </v-row>
    </v-col>

    <!-- filter area start -->
    <batch-filter
      v-if="showFilterStatus"
      :allSelectItems="batchAllTickets?.data?.dataFieldsSelectList"
      :savedFilter="batchAllTickets?.data?.filterTable?.filterList"
      v-on:fetchTicket="fetchAllTickets"
    />
    <!-- filter area end -->

    <v-col
      class="table-data"
      v-if="batchAllTickets?.data?.tickets && batchAllTickets?.data?.tickets?.length > 0"
    >
      <v-col class="table-scroll pa-0">
        <table class="custom-table-design" id="myTable">
          <thead>
            <tr>
              <th>
                <button
                  class="table_drop_icon"
                  :class="toggleTableParentStatus ? 'open-data' : ''"
                  @click="toggleTable()"
                >
                  <img src="@/assets/ticket-it/images/table-arrow.svg" />
                </button>
              </th>
              <th>
                <v-col-auto class="pa-0 w-auto custom_check mr-8"
                  ><input
                    type="checkbox"
                    name="check0"
                    :checked="checkParentVal"
                    @change="onChangeParentVal()"
                /></v-col-auto>
              </th>
              <th
                class="pa-0"
                v-for="(tableHeadings, i) in batchAllTickets?.data?.tickets[0]?.data"
                :key="i"
              >
                <span
                  class="pa-2"
                  v-if="
                    tableHeadings.columnName !== 'Select' &&
                    tableHeadings.columnName !== 'Print?' &&
                    tableHeadings.columnName !== 'Ticket Quantities'
                  "
                  >{{ tableHeadings.columnName }}</span
                >
              </th>
              <th>Actions</th>
              <th>Print?</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(tableData, i) in batchAllTickets?.data?.tickets" :key="i">
              <summary-table
                :tableData="tableData"
                :selectedRows="selectedRows"
                :checkParentVal="checkParentVal"
                :hideShowZeroStatus="hideShowZeroStatus"
                v-on:fetchTicket="fetchAllTickets"
                :adhocPageActive="adhocPageActive"
                :toggleTableParentStatus="toggleTableParentStatus"
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
        <p>No Tickets Available</p>
      </v-col>
    </v-col>

    <set-quantity
      v-if="quantityModalStatus"
      v-on:closeModal="quantityToggleModal"
      :selectedRows="selectedRows"
      :allQuantities="batchAllTickets"
      v-on:fetchTicket="fetchAllTickets"
    />

    <ticket-print
      v-if="printModalStatus"
      :selectedRows="selectedRows"
      v-on:closeModal="ticketPrintToggleModal"
      v-on:fetchTicket="fetchAllTickets"
    />

    <editable-field
      v-if="editableFieldsStatus"
      :selectedRows="selectedRows"
      v-on:closeModal="editableTicketsRow"
    />

    <!-- Adhoc flow -->
    <create-ticket v-if="createAdhocModalStatus" v-on:closeModal="createAdhocModal" />
  </v-col>
</template>

<script>
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { defineComponent, ref, computed, watch } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMagnify } from '@mdi/js'
import NavigationBar from '@/components/ticket-it/navigations/NavigationBar.vue'
import { Field, Form as VeeForm } from 'vee-validate'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import SummaryTable from '@/views/ticket-it/panel-view/batch-summary/SummaryTable.vue'
import SetQuantity from '@/views/ticket-it/panel-view/batch-summary/set-quantities/SetQuantities.vue'
import TicketPrint from '@/views/ticket-it/panel-view/batch-summary/ticket-print/TicketPrint.vue'
import CreateTicket from '@/views/ticket-it/panel-view/adhoc-tickets/create-ticket/CreateTicket.vue'
import EditableFields from '@/views/ticket-it/panel-view/batch-summary/editable-fields/EditableFields.vue'
import BatchFilter from '@/views/ticket-it/panel-view/batch-summary/data-filter/BatchFilter.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'
import { HEAD_OFFICE } from '@/core/ticket-it/global/globalVariables'
import { getUserData } from '@/core/ticket-it/services/JWTService'

export default defineComponent({
  name: 'batch-summary',
  components: {
    'navigation-bar': NavigationBar,
    'fill-button': FillButton,
    'button-with-icon': ButtonWithIcon,
    'summary-table': SummaryTable,
    'set-quantity': SetQuantity,
    'ticket-print': TicketPrint,
    'page-loader': PageLoader,
    'create-ticket': CreateTicket,
    'editable-field': EditableFields,
    'batch-filter': BatchFilter,
    Field,
    VeeForm,
    SvgIcon
  },
  setup() {
    const showBatchLoading = ref(true)
    const showAllButton = ref(false)
    const loader = ref(false)
    const roleName = getUserData()?.role
    let checkParentVal = ref(false)
    let quantityModalStatus = ref(false)
    let printModalStatus = ref(false)
    let hideShowZeroStatus = ref(false)
    let editableFieldsStatus = ref(false)
    let toggleTableParentStatus = ref(false)
    let showFilterStatus = ref(false)
    const store = useStore()
    const toast = useToast()
    const selectedRows = ref([])

    // adhoc flow
    const adhocPageActive = ref(false)
    let createAdhocModalStatus = ref(false)
    const fomVal = ref({
      batchId: new URLSearchParams(window.location.search).get('batchId'),
      searchString: '',
      filterSaveModel: []
    })

    const createAdhocModal = () => {
      createAdhocModalStatus.value = !createAdhocModalStatus.value
    }

    const quantityToggleModal = () => {
      quantityModalStatus.value = !quantityModalStatus.value
    }

    const toggleTable = () => {
      if (selectedRows.value.length > 0) {
        toggleTableParentStatus.value = !toggleTableParentStatus.value
      } else {
        alert('Please select atleast one row')
      }
    }

    const showFilter = () => {
      showFilterStatus.value = !showFilterStatus.value
    }

    const adhocPage = () => {
      if (window.location.href.includes('adhoc-tickets')) {
        adhocPageActive.value = !adhocPageActive.value
      }
    }

    // get all guid id on parent check
    const onChangeParentVal = () => {
      checkParentVal.value = !checkParentVal.value
      if (checkParentVal.value) {
        selectedRows.value = batchAllTickets.value?.data?.tickets.map((item) => item.guidString)
      } else {
        selectedRows.value = []
      }
    }

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const batchAllTickets = computed(() => {
      return store.getters.batchAllTicketsSuccess
    })
    const deleteTickets = computed(() => {
      return store.getters.deleteTicketsSuccess
    })
    const toggleTicketStatus = computed(() => {
      return store.getters.toggleTicketStatusSuccess
    })
    const bulkSetQuantity = computed(() => {
      return store.getters.bulkSetQuantitySuccess
    })
    const singleSetQuantity = computed(() => {
      return store.getters.singleSetQuantitySuccess
    })
    const singleTicketUpdate = computed(() => {
      return store.getters.singleTicketUpdateSuccess
    })
    const selectedRowsLength = computed(() => {
      return selectedRows.value.length
    })
    const createAdhocTicket = computed(() => {
      return store.getters.createAdhocTicketSuccess
    })
    const updateEditableFields = computed(() => {
      return store.getters.updateEditableFieldsSuccess
    })

    const fetchAllTickets = async (filterDataVal) => {
      if (filterDataVal?.length > 0) {
        loader.value = true
      }
      fomVal.value.filterSaveModel = filterDataVal || []
      await store.dispatch(Actions.BATCH_ALL_TICKETS, fomVal.value)
      loader.value = false

      setTimeout(() => {
        showBatchLoading.value = false
      }, 5000)
    }

    const hideShowZero = () => {
      hideShowZeroStatus.value = !hideShowZeroStatus.value
    }

    const deleteSelectedRows = async () => {
      if (window.confirm('Are you sure you want to delete the ticket ?')) {
        const batch = new URLSearchParams(window.location.search).get('batchId')
        await store.dispatch(Actions.DELETE_TICKETS, {
          batchId: batch,
          params: selectedRows.value
        })
        loader.value = true
        fetchAllTickets()
      }
    }

    const toggleSelectedRows = async () => {
      const batch = new URLSearchParams(window.location.search).get('batchId')
      await store.dispatch(Actions.TOGGLE_TICKET_STATUS, {
        batchId: batch,
        params: selectedRows.value
      })
      loader.value = true
      fetchAllTickets()
    }

    const ticketPrintToggleModal = async () => {
      printModalStatus.value = !printModalStatus.value
      if (printModalStatus.value) {
        const batch = new URLSearchParams(window.location.search).get('batchId')
        await store.dispatch(Actions.BULK_PRINT, {
          batchId: batch,
          params: selectedRows.value
        })
      }
    }

    const editableTicketsRow = async () => {
      editableFieldsStatus.value = !editableFieldsStatus.value
      if (editableFieldsStatus.value) {
        const batch = new URLSearchParams(window.location.search).get('batchId')
        await store.dispatch(Actions.TICKET_EDITABLE_FIELDS, {
          batchId: batch,
          params: selectedRows.value
        })
      }
    }

    const searchTicketList = () => {
      loader.value = true
      showAllButton.value = true
      fetchAllTickets()
    }

    const showAllTickets = () => {
      loader.value = true
      showAllButton.value = false
      fomVal.value.searchString = ''
      fetchAllTickets()
    }

    watch(selectedRowsLength, (newSelectedRows) => {
      if (newSelectedRows === 0) {
        checkParentVal.value = false
        toggleTableParentStatus.value = false
      }
    })
    watch(batchAllTickets, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(errorBatch, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.error(errorBatch.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(deleteTickets, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(deleteTickets.value.successMessage, {
          position: 'top-right'
        })
        loader.value = false
        checkParentVal.value = false
        selectedRows.value = []
      }
    })
    watch(toggleTicketStatus, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(toggleTicketStatus.value.successMessage, {
          position: 'top-right'
        })
        loader.value = false
        checkParentVal.value = false
        selectedRows.value = []
      }
    })
    watch(bulkSetQuantity, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(bulkSetQuantity.value.successMessage, {
          position: 'top-right'
        })
        fetchAllTickets()
        checkParentVal.value = false
        selectedRows.value = []
      }
    })
    watch(singleSetQuantity, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(singleSetQuantity.value.successMessage, {
          position: 'top-right'
        })
        fetchAllTickets()
      }
    })
    watch(singleTicketUpdate, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(singleTicketUpdate.value.successMessage, {
          position: 'top-right'
        })
        fetchAllTickets()
      }
    })
    watch(createAdhocTicket, (newVal) => {
      toast.clear()
      if (newVal) {
        toast.success(createAdhocTicket.value.successMessage, {
          position: 'top-right'
        })
        fetchAllTickets()
      }
    })
    watch(updateEditableFields, (newVal) => {
      toast.clear()
      if (newVal) {
        toast.success(updateEditableFields.value.successMessage, {
          position: 'top-right'
        })
        checkParentVal.value = false
        selectedRows.value = []
        fetchAllTickets()
      }
    })

    // Calling the all tickets api
    fetchAllTickets()
    adhocPage()

    return {
      TICKET_IT,
      mdiMagnify,
      onChangeParentVal,
      checkParentVal,
      quantityToggleModal,
      quantityModalStatus,
      ticketPrintToggleModal,
      printModalStatus,
      batchAllTickets,
      roleName,
      HEAD_OFFICE,
      deleteSelectedRows,
      selectedRows,
      loader,
      showBatchLoading,
      fetchAllTickets,
      toggleSelectedRows,
      createAdhocModal,
      createAdhocModalStatus,
      adhocPageActive,
      hideShowZero,
      hideShowZeroStatus,
      editableTicketsRow,
      editableFieldsStatus,
      searchTicketList,
      fomVal,
      showAllButton,
      showAllTickets,
      showFilter,
      showFilterStatus,
      toggleTable,
      toggleTableParentStatus
    }
  }
})
</script>
