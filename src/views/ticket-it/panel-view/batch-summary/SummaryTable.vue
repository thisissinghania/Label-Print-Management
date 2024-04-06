<template>
  <tr :class="checkVal == true ? 'checked_row' : ''">
    <td :class="toggleTableStatus ? 'grey-bg' : ''">
      <page-loader v-if="loader" />
      <button
        :tabIndex="tabIndexDisable"
        class="table_drop_icon"
        :class="toggleTableStatus ? 'open-data' : ''"
        @click="toggleTable()"
      >
        <img src="@/assets/ticket-it/images/table-arrow.svg" />
      </button>
    </td>
    <td>
      <v-col-auto class="pa-0 w-auto custom_check mr-2"
        ><input
          :tabIndex="tabIndexDisable"
          type="checkbox"
          :name="`check${tableRow?.id}`"
          :checked="checkVal"
          @change="onChangeVal(tableRow?.guidString)"
      /></v-col-auto>
    </td>
    <td class="pa-0" v-for="(allValues, i) in tableRow?.data" :key="i">
      <span
        class="pa-2 td-max-width"
        v-if="
          allValues.columnName !== 'Select' &&
          allValues.columnName !== 'Print?' &&
          allValues.columnName !== 'Ticket Quantities'
        "
        >{{ allValues?.value }}</span
      >
    </td>
    <td>
      <v-col class="table_buttons pa-0 d-flex align-center">
        <fill-button
          :tabIndex="tabIndexDisable"
          v-if="roleName === HEAD_OFFICE"
          @click="deleteRow(tableRow?.guidString)"
          class="small-font-cta fixed-width pa-3 mr-4"
          ><img src="@/assets/ticket-it/images/del.svg"
        /></fill-button>
      </v-col>
    </td>
    <td>
      <div class="d-flex align-center" v-for="(allValues, i) in tableRow?.data" :key="i">
        <label class="switch_cta ma-1" v-if="allValues?.columnName == 'Print?'">
          <input
            :tabIndex="tabIndexDisable"
            :checked="allValues?.value == 'true' ? true : false"
            type="checkbox"
            :name="`check${tableRow?.id}`"
            @change="onChangeToggleStatus(tableRow?.guidString)"
          />
          <span class="switch-check"></span>
        </label>
      </div>
    </td>
  </tr>

  <!--eslint-disable-->
  <tr :class="checkVal == true ? 'checked_row_child' : ''">
    <td colspan="100" class="pa-0" :class="toggleTableStatus ? '' : 'd-none'">
      <v-col class="sub-table-data" v-if="tableRow?.quantities && tableRow?.quantities?.length > 0">
        <v-row>
          <v-col cols="12" class="single-title">Ticket Quantities:</v-col>
          <v-col
            cols="4"
            sm="4"
            md="4"
            lg="3"
            class="single-sub-data pa-6"
            v-for="(quantityTicket, index) in tableRow?.quantities"
            :key="index"
            :class="quantityTicket?.quantity === 0 && !hideShowZero ? 'zero-hide' : ''"
          >
            <v-row class="d-flex align-center">
              <v-col cols="12" sm="6" class="text-black">{{ quantityTicket?.ticketName }}</v-col>
              <v-col cols="12" sm="6">
                <v-col class="custom-field pa-0">
                  <v-col class="field-type focus-inputs pa-0">
                    <Field
                      :name="quantityTicket?.ticketName"
                      type="number"
                      v-model="quantityTicket.quantity"
                      @change="
                        changeSingleQuantityValue(
                          tableRow?.id,
                          quantityTicket?.ticketName,
                          quantityTicket.quantity
                        )
                      "
                    />
                  </v-col>
                </v-col>
              </v-col>
              <v-col cols="12" class="d-flex">
                <div v-for="(allActions, i) in quantityTicket?.actions" :key="i">
                  <fill-button
                    :tabIndex="tabIndexDisable"
                    v-if="allActions?.title == 'Edit' && !adhocPageActiveStatus"
                    @click="ticketCustomiseModal(tableRow?.id, quantityTicket?.ticketName)"
                    class="small-font-cta fixed-width light-blue mr-2 pa-3"
                    ><img src="@/assets/ticket-it/images/pencil.svg"
                  /></fill-button>
                  <fill-button
                    :tabIndex="tabIndexDisable"
                    v-if="allActions?.title == 'Edit' && adhocPageActiveStatus"
                    @click="ticketAdhocCustomiseModal(tableRow?.id, quantityTicket?.ticketName)"
                    class="small-font-cta fixed-width light-blue mr-2 pa-3"
                    ><img src="@/assets/ticket-it/images/pencil.svg"
                  /></fill-button>
                  <fill-button
                    :tabIndex="tabIndexDisable"
                    v-if="allActions?.title == 'View'"
                    @click="ticketViewModal(tableRow?.id, quantityTicket?.ticketName)"
                    class="small-font-cta fixed-width dark-yellow mr-2 pa-3"
                    ><img src="@/assets/ticket-it/images/zoom-magnify.svg"
                  /></fill-button>
                  <fill-button
                    :tabIndex="tabIndexDisable"
                    v-if="allActions?.title == 'Print'"
                    @click="
                      printTicketData(
                        tableRow?.id,
                        quantityTicket?.ticketName,
                        quantityTicket?.quantity
                      )
                    "
                    class="small-font-cta dark-blue fixed-width mr-2 pa-3"
                    ><img src="@/assets/ticket-it/images/print.svg"
                  /></fill-button>
                  <!-- <fill-button
                    v-if="allActions?.title == 'Delete'"
                    class="small-font-cta fixed-width pa-3 mr-4"
                    ><img src="@/assets/ticket-it/images/del.svg"
                  /></fill-button> -->
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="pa-0" v-else>
        <v-col class="no-batch pa-5 text-center">
          <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
          <p>No Quantities Available</p>
        </v-col>
      </v-col>
    </td>
  </tr>

  <ticket-view v-if="ticketViewStatus" v-on:closeModal="ticketViewModal" />
  <customise-ticket
    v-if="ticketCustomiseStatus"
    v-on:closeModal="ticketCustomiseModal"
    :ticketId="tableRow?.id"
  />
  <adhoc-customise-ticket
    v-if="ticketAdhocCustomiseStatus"
    v-on:closeModal="ticketAdhocCustomiseModal"
    :ticketId="tableRow?.id"
  />
</template>

<script>
import { defineComponent, ref, toRef, watch, computed } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { Field } from 'vee-validate'
import TicketView from '@/views/ticket-it/panel-view/batch-summary/ticket-view/TicketView.vue'
import CustomiseTicket from '@/views/ticket-it/panel-view/batch-summary/customise-ticket/CustomiseTicket.vue'
import AdhocCustomiseTicket from '@/views/ticket-it/panel-view/adhoc-tickets/adhoc-customise-ticket/CustomiseTicket.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { HEAD_OFFICE } from '@/core/ticket-it/global/globalVariables'
import { getUserData } from '@/core/ticket-it/services/JWTService'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'summary-table',
  components: {
    'fill-button': FillButton,
    'ticket-view': TicketView,
    'customise-ticket': CustomiseTicket,
    'adhoc-customise-ticket': AdhocCustomiseTicket,
    'page-loader': PageLoader,
    Field
  },
  props: {
    tableData: {
      type: Object,
      required: false
    },
    selectedRows: {
      type: Array,
      required: false
    },
    checkParentVal: {
      type: Boolean,
      required: false
    },
    hideShowZeroStatus: {
      type: Boolean,
      required: false
    },
    adhocPageActive: {
      type: Boolean,
      required: false
    },
    toggleTableParentStatus: {
      type: Boolean,
      required: false
    }
  },
  setup(props, { emit }) {
    const loader = ref(false)
    const tabIndexDisable = ref('1000000')
    const roleName = getUserData()?.role
    const tableRow = toRef(props, 'tableData')
    const selectedRow = toRef(props, 'selectedRows')
    const checkParentValue = toRef(props, 'checkParentVal')
    const hideShowZero = toRef(props, 'hideShowZeroStatus')
    const adhocPageActiveStatus = toRef(props, 'adhocPageActive')
    const toggleTableStatusParent = toRef(props, 'toggleTableParentStatus')
    let checkVal = ref(false)
    let ticketViewStatus = ref(false)
    let ticketCustomiseStatus = ref(false)
    let ticketAdhocCustomiseStatus = ref(false)
    let toggleTableStatus = ref(false)
    const store = useStore()

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const deleteTickets = computed(() => {
      return store.getters.deleteTicketsSuccess
    })
    const toggleTicketStatus = computed(() => {
      return store.getters.toggleTicketStatusSuccess
    })
    const singleSetQuantity = computed(() => {
      return store.getters.singleSetQuantitySuccess
    })
    const selectedRowsLength = computed(() => {
      return selectedRow.value?.length
    })

    // set input quantity without reload
    const quantity = computed({
      get: () => tableRow.value?.quantities,
      set: (newQuantities) => {
        tableRow.value.quantities = newQuantities
      }
    })

    const toggleTable = () => {
      toggleTableStatus.value = !toggleTableStatus.value
    }

    const printTicketData = async (ticketId, name, quantity) => {
      const batch = new URLSearchParams(window.location.search).get('batchId')
      const payload = {
        id: batch,
        templateName: name,
        ticketGuids: selectedRow.value,
        ticketId: ticketId,
        offset: 0,
        quantity: `${quantity}`,
        hasTicketSelection: true
      }
      const queryParams = new URLSearchParams(payload).toString()
      window.open(`${TICKET_IT}/building-ticket?${queryParams}`)
    }

    const ticketViewModal = async (ticketId, name) => {
      ticketViewStatus.value = !ticketViewStatus.value
      if (ticketViewStatus.value) {
        const batch = new URLSearchParams(window.location.search).get('batchId')
        const ticketParams = {
          batchId: batch,
          templateName: name,
          ticketId: ticketId,
          isPreview: true,
          ticketsToTake: -1
        }
        await store.dispatch(Actions.SINGLE_TICKET_VIEW, ticketParams)
      }
    }

    const ticketCustomiseModal = async (id, name) => {
      ticketCustomiseStatus.value = !ticketCustomiseStatus.value
      if (ticketCustomiseStatus.value) {
        const batch = new URLSearchParams(window.location.search).get('batchId')
        await store.dispatch(Actions.SINGLE_TICKET_EDIT, { template: name, batchId: batch, id: id })
      }
    }

    const ticketAdhocCustomiseModal = async (id, name) => {
      ticketAdhocCustomiseStatus.value = !ticketAdhocCustomiseStatus.value
      if (ticketAdhocCustomiseStatus.value) {
        const batch = new URLSearchParams(window.location.search).get('batchId')
        await store.dispatch(Actions.ADHOC_SINGLE_TICKET_EDIT, {
          template: name,
          batchId: batch,
          ticketId: id
        })
      }
    }

    const onChangeVal = (guid) => {
      checkVal.value = !checkVal.value
      if (checkVal.value) {
        selectedRow.value.push(guid)
      } else {
        selectedRow.value.splice(selectedRow.value.indexOf(guid), 1)
      }
    }

    const deleteRow = async (guid) => {
      if (window.confirm('Are you sure you want to delete the ticket ?')) {
        loader.value = true
        const batch = new URLSearchParams(window.location.search).get('batchId')
        await store.dispatch(Actions.DELETE_TICKETS, {
          batchId: batch,
          params: [guid]
        })
        emit('fetchTicket')
      }
    }

    const onChangeToggleStatus = async (guid) => {
      loader.value = true
      const batch = new URLSearchParams(window.location.search).get('batchId')
      await store.dispatch(Actions.TOGGLE_TICKET_STATUS, {
        batchId: batch,
        params: [guid]
      })
      emit('fetchTicket')
    }

    const changeSingleQuantityValue = async (id, name, value) => {
      // loader.value = true
      const batch = new URLSearchParams(window.location.search).get('batchId')
      await store.dispatch(Actions.SINGLE_SET_QUANTITIES, {
        batchId: batch,
        templateName: name,
        ticketId: id,
        newQuantity: value
      })
    }

    // all watch methods
    watch(errorBatch, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(deleteTickets, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(toggleTicketStatus, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(singleSetQuantity, (newValue) => {
      if (newValue) {
        // loader.value = false
      }
    })
    watch(checkParentValue, (newValue) => {
      if (newValue) {
        checkVal.value = true
      } else {
        checkVal.value = false
      }
    })
    watch(selectedRowsLength, (newSelectedRows) => {
      if (newSelectedRows === 0) {
        checkVal.value = false
      }
    })
    watch(toggleTableStatusParent, (newValue) => {
      if (newValue) {
        if (checkVal.value) {
          toggleTableStatus.value = true
        }
      } else {
        toggleTableStatus.value = false
      }
    })

    return {
      tableRow,
      toggleTable,
      onChangeVal,
      checkVal,
      ticketViewModal,
      ticketCustomiseModal,
      ticketAdhocCustomiseModal,
      ticketViewStatus,
      ticketCustomiseStatus,
      ticketAdhocCustomiseStatus,
      roleName,
      HEAD_OFFICE,
      deleteRow,
      onChangeToggleStatus,
      loader,
      toggleTableStatus,
      hideShowZero,
      quantity,
      changeSingleQuantityValue,
      adhocPageActiveStatus,
      printTicketData,
      toggleTableStatusParent,
      tabIndexDisable
    }
  }
})
</script>
