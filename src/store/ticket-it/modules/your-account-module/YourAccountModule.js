import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const YourAccountModule = {
  state() {
    return {
      error: {},
      currentUserDetail: {},
      updateCurrentUser: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_CURRENT_USER_DETAIL](state, payload) {
      state.currentUserDetail = payload
    },
    [Mutations.SET_UPDATE_CURRENT_USER](state, payload) {
      state.updateCurrentUser = payload
    }
  },
  actions: {
    [Actions.CURRENT_USER_DETAIL]({ commit }) {
      return ApiServices.get(`${BASE_URL}/User/GetCurrentLoginUserDetails`)
        .then((response) => {
          const data = response.data.data
          commit(Mutations.SET_CURRENT_USER_DETAIL, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.UPDATE_CURRENT_USER]({ commit }, params) {
      return ApiServices.post(`${BASE_URL}/User/Edit/User`, params)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_UPDATE_CURRENT_USER, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorYourAccount(state) {
      return state.error
    },
    currentUserDetailSuccess(state) {
      return state.currentUserDetail
    },
    updateCurrentUserSuccess(state) {
      return state.updateCurrentUser
    }
  }
}

export default YourAccountModule
