import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const AdhocModule = {
  state() {
    return {
      error: {},
      adhocTemplateNames: {},
      adhocTicketFields: {},
      adhocTemplatePreview: {},
      createAdhocTicket: {},
      setSearchableFields: {},
      setSearchableFieldsData: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_ADHOC_TEMPLATE_NAMES](state, payload) {
      state.adhocTemplateNames = payload
    },
    [Mutations.SET_ADHOC_TICKET_FIELDS](state, payload) {
      state.adhocTicketFields = payload
    },
    [Mutations.SET_ADHOC_TEMPLATE_PREVIEW](state, payload) {
      state.adhocTemplatePreview = payload
    },
    [Mutations.SET_CREATE_ADHOC_TICKET](state, payload) {
      state.createAdhocTicket = payload
    },
    [Mutations.SET_SEARCHABLE_FIELDS](state, payload) {
      state.setSearchableFields = payload
    },
    [Mutations.SET_SEARCHABLE_FIELDS_DATA](state, payload) {
      state.setSearchableFieldsData = payload
    }
  },
  actions: {
    [Actions.ADHOC_TEMPLATE_NAMES]({ commit }) {
      commit(Mutations.SET_ADHOC_TICKET_FIELDS, null)
      commit(Mutations.SET_ADHOC_TEMPLATE_PREVIEW, null)
      return ApiServices.get(`${BASE_URL}/Batch/GetTemplatesForAdhoc`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_ADHOC_TEMPLATE_NAMES, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.ADHOC_TICKET_FIELDS]({ commit }, params) {
      commit(Mutations.SET_ADHOC_TICKET_FIELDS, null)
      return ApiServices.get(`${BASE_URL}/Batch/GetAdhocTicket?templateName=${params}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_ADHOC_TICKET_FIELDS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.ADHOC_TEMPLATE_PREVIEW]({ commit }, { templateName, batchId, payload }) {
      commit(Mutations.SET_ADHOC_TEMPLATE_PREVIEW, null)
      return ApiServices.post(
        `${BASE_URL}/Batch/AdhocPreviewJson?templateName=${templateName}&batchId=${batchId}`,
        payload
      )
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_ADHOC_TEMPLATE_PREVIEW, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CREATE_ADHOC_TICKET]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/CreateAdhocBatch`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CREATE_ADHOC_TICKET, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SEARCHABLE_FIELDS]({ commit }, { query, coreKey, templateName }) {
      return ApiServices.post(
        `${BASE_URL}/Batch/InputSearchableFields?query=${query}&coreKey=${coreKey}&templateName=${templateName}`
      )
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SEARCHABLE_FIELDS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SEARCHABLE_FIELDS_DATA]({ commit }, { coreKey, templateName }) {
      return ApiServices.post(
        `${BASE_URL}/Batch/GetDataForCore?coreKey=${coreKey}&templateName=${templateName}`
      )
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SEARCHABLE_FIELDS_DATA, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorAdhoc(state) {
      return state.error
    },
    adhocTicketFieldsSuccess(state) {
      return state.adhocTicketFields
    },
    adhocTemplateNamesSuccess(state) {
      return state.adhocTemplateNames
    },
    adhocTemplatePreviewSuccess(state) {
      return state.adhocTemplatePreview
    },
    createAdhocTicketSuccess(state) {
      return state.createAdhocTicket
    },
    setSearchableFieldsSuccess(state) {
      return state.setSearchableFields
    },
    setSearchableFieldsDataSuccess(state) {
      return state.setSearchableFieldsData
    }
  }
}

export default AdhocModule
