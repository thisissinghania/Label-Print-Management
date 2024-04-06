import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const ChangeReportModule = {
  state() {
    return {
      error: {},
      changeReportList: {},
      changeReportDetail: {},
      changeReportModalList: {},
      changeBatchFromReport: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_CHANGE_REPORT_LIST](state, payload) {
      state.changeReportList = payload
    },
    [Mutations.SET_CHANGE_REPORT_DETAIL](state, payload) {
      state.changeReportDetail = payload
    },
    [Mutations.SET_CHANGE_REPORT_MODAL_LIST](state, payload) {
      state.changeReportModalList = payload
    },
    [Mutations.SET_CHANGE_BATCH_FROM_REPORT](state, payload) {
      state.changeBatchFromReport = payload
    }
  },
  actions: {
    [Actions.CHANGE_REPORT_LIST]({ commit }) {
      return ApiServices.get(`${BASE_URL}/Report/PriceChangeDetails`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CHANGE_REPORT_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CHANGE_REPORT_DETAIL]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Report/PostChangeReportDetails`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CHANGE_REPORT_DETAIL, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CHANGE_REPORT_MODAL_LIST]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Report/CreateBatchFromPriceChangeRequestModel`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CHANGE_REPORT_MODAL_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CHANGE_BATCH_FROM_REPORT]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/CreateBatchFromPriceChange`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CHANGE_BATCH_FROM_REPORT, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorChangeReport(state) {
      return state.error
    },
    changeReportListSuccess(state) {
      return state.changeReportList
    },
    changeReportDetailSuccess(state) {
      return state.changeReportDetail
    },
    changeReportModalListSuccess(state) {
      return state.changeReportModalList
    },
    changeBatchFromReportSuccess(state) {
      return state.changeBatchFromReport
    }
  }
}

export default ChangeReportModule
