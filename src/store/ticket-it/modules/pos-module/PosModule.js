import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const PosModule = {
  state() {
    return {
      error: {},
      posPurchaseOrder: {},
      batchPoDetail: {},
      createBatchFromPo: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_POS_PURCHASE_ORDER](state, payload) {
      state.posPurchaseOrder = payload
    },
    [Mutations.SET_BATCH_PO_DETAIL](state, payload) {
      state.batchPoDetail = payload
    },
    [Mutations.SET_CREATE_BATCH_FROM_PO](state, payload) {
      state.createBatchFromPo = payload
    }
  },
  actions: {
    [Actions.POS_PURCHASE_ORDER]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/PurchaseOrder/SearchForPOData`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_POS_PURCHASE_ORDER, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.BATCH_PO_DETAIL]({ commit }, payload) {
      return ApiServices.get(`${BASE_URL}/PurchaseOrder/GetPODataById?id=${payload}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_BATCH_PO_DETAIL, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CREATE_BATCH_FROM_PO]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/CreateBatchFromPurchaseOrder`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CREATE_BATCH_FROM_PO, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorPos(state) {
      return state.error
    },
    posPurchaseOrderSuccess(state) {
      return state.posPurchaseOrder
    },
    batchPoDetailSuccess(state) {
      return state.batchPoDetail
    },
    createBatchFromPoSuccess(state) {
      return state.createBatchFromPo
    }
  }
}

export default PosModule
