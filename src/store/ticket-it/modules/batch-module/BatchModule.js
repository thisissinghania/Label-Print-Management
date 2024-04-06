import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const BatchModule = {
  state() {
    return {
      error: {},
      creatingBatchMethods: {},
      batchList: {},
      adhocBatchList: {},
      createBatch: {},
      recallBatch: {},
      deleteBatch: {},
      singleBatch: {},
      batchAllTickets: {},
      deleteTickets: {},
      previewListData: {},
      singleTicketView: {},
      toggleTicketStatus: {},
      singleTicketEdit: {},
      adhocSingleTicketEdit: {},
      bulkSetQuantity: {},
      singleSetQuantity: {},
      singleTicketUpdate: {},
      bulkPrint: {},
      promoPreviewJson: {},
      startRendering: {},
      checkPdfStatus: {},
      ticketEditableFields: {},
      updateEditableFields: {},
      startRenderingPng: {},
      saveDataFilter: {},
      savedFilterList: {},
      deleteFilterList: {},
      updateFilterList: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_CREATING_BATCH_METHODS](state, payload) {
      state.creatingBatchMethods = payload
    },
    [Mutations.SET_BATCH_LIST](state, payload) {
      state.batchList = payload
      state.adhocBatchList = null
    },
    [Mutations.SET_ADHOC_BATCH_LIST](state, payload) {
      state.adhocBatchList = payload
    },
    [Mutations.SET_CREATE_BATCH](state, payload) {
      state.createBatch = payload
    },
    [Mutations.SET_RECALL_BATCH](state, payload) {
      state.recallBatch = payload
    },
    [Mutations.SET_DELETE_BATCH](state, payload) {
      state.deleteBatch = payload
    },
    [Mutations.SET_SINGLE_BATCH](state, payload) {
      state.singleBatch = payload
    },
    [Mutations.SET_BATCH_ALL_TICKETS](state, payload) {
      state.batchAllTickets = payload
    },
    [Mutations.SET_DELETE_TICKETS](state, payload) {
      state.deleteTickets = payload
    },
    [Mutations.SET_PREVIEW_LIST_DATA](state, payload) {
      state.previewListData = payload
    },
    [Mutations.SET_SINGLE_TICKET_VIEW](state, payload) {
      state.singleTicketView = payload
    },
    [Mutations.SET_TOGGLE_TICKET_STATUS](state, payload) {
      state.toggleTicketStatus = payload
    },
    [Mutations.SET_SINGLE_TICKET_EDIT](state, payload) {
      state.singleTicketEdit = payload
    },
    [Mutations.SET_ADHOC_SINGLE_TICKET_EDIT](state, payload) {
      state.adhocSingleTicketEdit = payload
    },
    [Mutations.SET_BULK_SET_QUANTITIES](state, payload) {
      state.bulkSetQuantity = payload
    },
    [Mutations.SET_SINGLE_SET_QUANTITIES](state, payload) {
      state.singleSetQuantity = payload
    },
    [Mutations.SET_SINGLE_TICKET_UPDATE](state, payload) {
      state.singleTicketUpdate = payload
    },
    [Mutations.SET_BULK_PRINT](state, payload) {
      state.bulkPrint = payload
    },
    [Mutations.SET_PROMO_PREVIEW_JSON](state, payload) {
      state.promoPreviewJson = payload
    },
    [Mutations.SET_START_RENDERING](state, payload) {
      state.startRendering = payload
    },
    [Mutations.SET_CHECK_PDF_STATUS](state, payload) {
      state.checkPdfStatus = payload
    },
    [Mutations.SET_TICKET_EDITABLE_FIELDS](state, payload) {
      state.ticketEditableFields = payload
    },
    [Mutations.SET_UPDATE_EDITABLE_FIELDS](state, payload) {
      state.updateEditableFields = payload
    },
    [Mutations.SET_START_RENDERING_PNG](state, payload) {
      state.startRenderingPng = payload
    },
    [Mutations.SET_SAVE_DATA_FILTER](state, payload) {
      state.saveDataFilter = payload
    },
    [Mutations.SET_SAVED_FILTER_LIST](state, payload) {
      state.savedFilterList = payload
    },
    [Mutations.SET_DELETE_FILTER_LIST](state, payload) {
      state.deleteFilterList = payload
    },
    [Mutations.SET_UPDATE_FILTER_LIST](state, payload) {
      state.updateFilterList = payload
    }
  },
  actions: {
    [Actions.CREATING_BATCH_METHODS]({ commit }) {
      return ApiServices.get(`${BASE_URL}/Batch/DynamicBatchCreationsList`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CREATING_BATCH_METHODS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.BATCH_LIST]({ commit }, params) {
      commit(Mutations.SET_BATCH_ALL_TICKETS, null)
      return ApiServices.post(`${BASE_URL}/Batch/GetBatchPagingList`, params)
        .then((response) => {
          const data = response.data.data
          commit(Mutations.SET_BATCH_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.ADHOC_BATCH_LIST]({ commit }, params) {
      commit(Mutations.SET_BATCH_ALL_TICKETS, null)
      return ApiServices.post(`${BASE_URL}/Batch/GetBatchPagingList`, params)
        .then((response) => {
          const data = response.data.data
          commit(Mutations.SET_ADHOC_BATCH_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CREATE_BATCH]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/create/batch`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CREATE_BATCH, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.RECALL_BATCH]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/RecallBatch`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_RECALL_BATCH, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.DELETE_BATCH]({ commit }, payload) {
      return ApiServices.delete(`${BASE_URL}/Batch/DeleteBatchById?batchId=${payload}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_DELETE_BATCH, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SINGLE_BATCH]({ commit }, payload) {
      return ApiServices.get(`${BASE_URL}/Batch/GetBatchesById?batchId=${payload}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SINGLE_BATCH, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.BATCH_ALL_TICKETS]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/NewView`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_BATCH_ALL_TICKETS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.DELETE_TICKETS]({ commit }, { batchId, params }) {
      return ApiServices.delete(
        `${BASE_URL}/Batch/BulkDeleteTicketsByBatchIdAndGuids?batchId=${batchId}`,
        { data: params }
      )
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_DELETE_TICKETS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.PREVIEW_LIST_DATA]({ commit }, batchId) {
      commit(Mutations.SET_PREVIEW_LIST_DATA, null)
      return ApiServices.post(`${BASE_URL}/Batch/PreviewAllTicket`, batchId)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_PREVIEW_LIST_DATA, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SINGLE_TICKET_VIEW]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/PreviewTicket`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SINGLE_TICKET_VIEW, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.TOGGLE_TICKET_STATUS]({ commit }, { batchId, params }) {
      return ApiServices.post(`${BASE_URL}/Batch/BulkTogglePrintStatus?batchId=${batchId}`, params)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_TOGGLE_TICKET_STATUS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SINGLE_TICKET_EDIT]({ commit }, { template, batchId, id }) {
      commit(Mutations.SET_SINGLE_TICKET_EDIT, null)
      return ApiServices.post(
        `${BASE_URL}/Batch/SingleTicketEdit?templateName=${template}&batchId=${batchId}&id=${id}`
      )
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SINGLE_TICKET_EDIT, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.ADHOC_SINGLE_TICKET_EDIT]({ commit }, { template, batchId, ticketId }) {
      commit(Mutations.SET_ADHOC_SINGLE_TICKET_EDIT, null)
      return ApiServices.post(
        `${BASE_URL}/Batch/EditAdhocTicket?templateName=${template}&batchId=${batchId}&ticketId=${ticketId}`
      )
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_ADHOC_SINGLE_TICKET_EDIT, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.BULK_SET_QUANTITIES]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/SetQuantities`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_BULK_SET_QUANTITIES, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SINGLE_SET_QUANTITIES]({ commit }, { batchId, templateName, ticketId, newQuantity }) {
      return ApiServices.post(
        `${BASE_URL}/Batch/UpdateTemplateQuantities?batchId=${batchId}&templateName=${templateName}&ticketId=${ticketId}&newQuantity=${newQuantity}`
      )
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SINGLE_SET_QUANTITIES, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SINGLE_TICKET_UPDATE]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/UpdateSingleTicket`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SINGLE_TICKET_UPDATE, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.BULK_PRINT]({ commit }, { batchId, params }) {
      return ApiServices.post(`${BASE_URL}/Batch/BulkPrint?batchId=${batchId}`, params)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_BULK_PRINT, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.PROMO_PREVIEW_JSON]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/PreviewEditJson`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_PROMO_PREVIEW_JSON, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.START_RENDERING]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/StartRendering`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_START_RENDERING, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CHECK_PDF_STATUS]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/CheckStatus?jobId=${payload}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CHECK_PDF_STATUS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.TICKET_EDITABLE_FIELDS]({ commit }, { batchId, params }) {
      return ApiServices.post(`${BASE_URL}/Batch/BulkGetEditableFields?batchId=${batchId}`, params)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_TICKET_EDITABLE_FIELDS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.UPDATE_EDITABLE_FIELDS]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/BulkEditFields`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_UPDATE_EDITABLE_FIELDS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.START_RENDERING_PNG]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/StartRenderingPNG`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_START_RENDERING_PNG, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SAVE_DATA_FILTER]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/SaveFilter`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SAVE_DATA_FILTER, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SAVED_FILTER_LIST]({ commit }) {
      commit(Mutations.SET_SAVED_FILTER_LIST, null)
      return ApiServices.get(`${BASE_URL}/Batch/GetSavedFilters`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SAVED_FILTER_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.DELETE_FILTER_LIST]({ commit }, payload) {
      return ApiServices.delete(`${BASE_URL}/Batch/DeleteFilterById?id=${payload}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_DELETE_FILTER_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.UPDATE_FILTER_LIST]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/UpdateFilter`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_UPDATE_FILTER_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorBatch(state) {
      return state.error
    },
    creatingBatchMethodsSuccess(state) {
      return state.creatingBatchMethods
    },
    batchListData(state) {
      return state.batchList
    },
    adhocBatchListData(state) {
      return state.adhocBatchList
    },
    createBatchSuccess(state) {
      return state.createBatch
    },
    recallBatchSuccess(state) {
      return state.recallBatch
    },
    deleteBatchSuccess(state) {
      return state.deleteBatch
    },
    singleBatchSuccess(state) {
      return state.singleBatch
    },
    batchAllTicketsSuccess(state) {
      return state.batchAllTickets
    },
    deleteTicketsSuccess(state) {
      return state.deleteTickets
    },
    previewListDataSuccess(state) {
      return state.previewListData
    },
    singleTicketViewSuccess(state) {
      return state.singleTicketView
    },
    toggleTicketStatusSuccess(state) {
      return state.toggleTicketStatus
    },
    singleTicketEditSuccess(state) {
      return state.singleTicketEdit
    },
    adhocSingleTicketEditSuccess(state) {
      return state.adhocSingleTicketEdit
    },
    bulkSetQuantitySuccess(state) {
      return state.bulkSetQuantity
    },
    singleSetQuantitySuccess(state) {
      return state.singleSetQuantity
    },
    singleTicketUpdateSuccess(state) {
      return state.singleTicketUpdate
    },
    bulkPrintSuccess(state) {
      return state.bulkPrint
    },
    promoPreviewJsonSuccess(state) {
      return state.promoPreviewJson
    },
    startRenderingSuccess(state) {
      return state.startRendering
    },
    checkPdfStatusSuccess(state) {
      return state.checkPdfStatus
    },
    ticketEditableFieldsSuccess(state) {
      return state.ticketEditableFields
    },
    updateEditableFieldsSuccess(state) {
      return state.updateEditableFields
    },
    startRenderingPngSuccess(state) {
      return state.startRenderingPng
    },
    saveDataFilterSuccess(state) {
      return state.saveDataFilter
    },
    savedFilterListSuccess(state) {
      return state.savedFilterList
    },
    deleteFilterListSuccess(state) {
      return state.deleteFilterList
    },
    updateFilterListSuccess(state) {
      return state.updateFilterList
    }
  }
}

export default BatchModule
