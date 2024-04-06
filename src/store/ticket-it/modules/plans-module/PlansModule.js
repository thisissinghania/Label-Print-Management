import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const PlansModule = {
  state() {
    return {
      error: {},
      plansList: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_PLANS_LIST](state, payload) {
      state.plansList = payload
    }
  },
  actions: {
    [Actions.PLANS_LIST]({ commit }) {
      return ApiServices.get(`${BASE_URL}/Chargebee/GetChargebeePlans`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_PLANS_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorPlans(state) {
      return state.error
    },
    plansListSuccess(state) {
      return state.plansList
    }
  }
}

export default PlansModule
