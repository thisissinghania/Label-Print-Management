import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const ReportModule = {
  state() {
    return {
      error: {},
      printedBatches: {},
      userActivity: {},
      printReportDetail: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_PRINTED_BATCHES](state, payload) {
      state.printedBatches = payload
    },
    [Mutations.SET_USER_ACTIVITY](state, payload) {
      state.userActivity = payload
    },
    [Mutations.SET_PRINT_REPORT_DETAIL](state, payload) {
      state.printReportDetail = payload
    }
  },
  actions: {
    [Actions.PRINTED_BATCHES]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Report/PrintedBatchesReport`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_PRINTED_BATCHES, data)
          commit(Mutations.SET_USER_ACTIVITY, null)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.USER_ACTIVITY]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Report/UserActivityReport`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_USER_ACTIVITY, data)
          commit(Mutations.SET_PRINTED_BATCHES, null)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.PRINT_REPORT_DETAIL]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Report/ShowPrintedBatchDetail`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_PRINT_REPORT_DETAIL, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorReports(state) {
      return state.error
    },
    printedBatchesSuccess(state) {
      return state.printedBatches
    },
    userActivitySuccess(state) {
      return state.userActivity
    },
    printReportDetailSuccess(state) {
      return state.printReportDetail
    }
  }
}

export default ReportModule
