import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const EslModule = {
  state() {
    return {
      error: {},
      eslListData: {},
      connectEsl: {},
      viewEslData: {},
      disconnectEsl: {},
      findSku: {},
      flashColor: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_ESL_LIST](state, payload) {
      state.eslListData = payload
    },
    [Mutations.SET_CONNECT_ESL](state, payload) {
      state.connectEsl = payload
    },
    [Mutations.SET_VIEW_ESL](state, payload) {
      state.viewEslData = payload
    },
    [Mutations.SET_DISCONNECT_ESL](state, payload) {
      state.disconnectEsl = payload
    },
    [Mutations.SET_FIND_SKU](state, payload) {
      state.findSku = payload
    },
    [Mutations.SET_FLASH_COLOR](state, payload) {
      state.flashColor = payload
    }
  },
  actions: {
    [Actions.ESL_LIST]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/ESL/GetAssignedEslPagingList`, payload)
        .then((response) => {
          const data = response.data.data
          commit(Mutations.SET_ESL_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CONNECT_ESL]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/ESL/bind`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CONNECT_ESL, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.VIEW_ESL]({ commit }, { barcode }) {
      commit(Mutations.SET_VIEW_ESL, null)
      return ApiServices.get(`${BASE_URL}/ESL/GetESLInfo/${barcode}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_VIEW_ESL, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.DISCONNECT_ESL]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/ESL/UnBind`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_DISCONNECT_ESL, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.FIND_SKU]({ commit }, { skuNumber }) {
      return ApiServices.get(`${BASE_URL}/ESL/searchProduct/${skuNumber}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_FIND_SKU, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.FLASH_COLOR]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/ESL/Flash`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_FLASH_COLOR, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorEsl(state) {
      return state.error
    },
    eslListDataSuccess(state) {
      return state.eslListData
    },
    connectEslSuccess(state) {
      return state.connectEsl
    },
    viewEslDataSuccess(state) {
      return state.viewEslData
    },
    disconnectEslSuccess(state) {
      return state.disconnectEsl
    },
    findSkuSuccess(state) {
      return state.findSku
    },
    flashColorSuccess(state) {
      return state.flashColor
    }
  }
}

export default EslModule
