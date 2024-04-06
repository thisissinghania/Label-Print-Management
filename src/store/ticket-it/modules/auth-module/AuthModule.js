import axios from 'axios'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { saveToken, saveUser, destroyToken } from '@/core/ticket-it/services/JWTService'

const AuthModule = {
  state() {
    return {
      loginData: {},
      error: {},
      logout: false,
      forgotPassword: {},
      updatePassword: {},
      registerUser: {},
      dynamicClients: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_LOGIN](state, payload) {
      state.loginData = payload
      state.logout = false
      saveToken(payload.data)
      saveUser(payload.data)
    },
    [Mutations.SET_LOGOUT](state) {
      destroyToken()
      state.logout = true
    },
    [Mutations.SET_FORGOT_PASSWORD](state, payload) {
      state.forgotPassword = payload
    },
    [Mutations.SET_UPDATE_PASSWORD](state, payload) {
      state.updatePassword = payload
    },
    [Mutations.SET_DYNAMIC_CLIENTS](state, payload) {
      state.dynamicClients = payload
    },
    [Mutations.SET_REGISTER_USER](state, payload) {
      state.registerUser = payload
    }
  },
  actions: {
    [Actions.LOGIN]({ commit }, payload) {
      axios
        .post(`${BASE_URL}/Account/login`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_LOGIN, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.LOGOUT]({ commit }) {
      commit(Mutations.SET_LOGOUT)
    },
    [Actions.FORGOT_PASSWORD]({ commit }, payload) {
      axios
        .post(`${BASE_URL}/Account/SendForgotPasswordEmail`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_FORGOT_PASSWORD, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.UPDATE_PASSWORD]({ commit }, payload) {
      axios
        .post(`${BASE_URL}/Account/resetpassword`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_UPDATE_PASSWORD, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.DYNAMIC_CLIENTS]({ commit }) {
      axios
        .get(`${BASE_URL}/Client/GetClientsFromDynamicClients`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_DYNAMIC_CLIENTS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response)
        })
    },
    [Actions.REGISTER_USER]({ commit }, payload) {
      axios
        .post(`${BASE_URL}/Account/RegisterUser`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_REGISTER_USER, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorType(state) {
      return state.error
    },
    loginSuccess(state) {
      return state.loginData
    },
    logoutSuccess(state) {
      return state.logout
    },
    forgotPasswordSuccess(state) {
      return state.forgotPassword
    },
    updatePasswordSuccess(state) {
      return state.updatePassword
    },
    dynamicClientsList(state) {
      return state.dynamicClients
    },
    registerUserSuccess(state) {
      return state.registerUser
    }
  }
}

export default AuthModule
