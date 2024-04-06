import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const PosPromotionModule = {
  state() {
    return {
      error: {},
      posPromotionList: {},
      posPromotionData: {},
      posPromotionModalList: {},
      posPromotionBatch: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_POS_PROMOTION_LIST](state, payload) {
      state.posPromotionList = payload
    },
    [Mutations.SET_POS_PROMOTION_DATA](state, payload) {
      state.posPromotionData = payload
    },
    [Mutations.SET_POS_PROMOTION_MODAL_LIST](state, payload) {
      state.posPromotionModalList = payload
    },
    [Mutations.SET_POS_PROMOTION_BATCH](state, payload) {
      state.posPromotionBatch = payload
    }
  },
  actions: {
    [Actions.POS_PROMOTION_LIST]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/POSPromotion/GetPOSPromotionDetail`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_POS_PROMOTION_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.POS_PROMOTION_DATA]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/POSPromotion/CreatePOSPromotions`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_POS_PROMOTION_DATA, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.POS_PROMOTION_MODAL_LIST]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/POSPromotion/GetDataFromPOSPromotions`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_POS_PROMOTION_MODAL_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.POS_PROMOTION_BATCH]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/CreatePromoBatchFromIntegration`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_POS_PROMOTION_BATCH, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorPosPromotion(state) {
      return state.error
    },
    posPromotionListSuccess(state) {
      return state.posPromotionList
    },
    posPromotionDataSuccess(state) {
      return state.posPromotionData
    },
    posPromotionModalListSuccess(state) {
      return state.posPromotionModalList
    },
    posPromotionBatchSuccess(state) {
      return state.posPromotionBatch
    }
  }
}

export default PosPromotionModule
