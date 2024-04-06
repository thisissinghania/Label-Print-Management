import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const UserAdministrationModule = {
  state() {
    return {
      error: {},
      userLists: {},
      userInvoice: {},
      deleteUser: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_USERS_ROLES](state, payload) {
      state.userLists = payload
    },
    [Mutations.SET_USERS_INVOICE](state, payload) {
      state.userInvoice = payload
    },
    [Mutations.SET_DELETE_USER](state, payload) {
      state.deleteUser = payload
    }
  },
  actions: {
    [Actions.USERS_ROLES]({ commit }, { userRole, clientName, params }) {
      return ApiServices.post(
        `${BASE_URL}/User/GetUsersByRoles?roleId=${userRole}&clientName=${clientName}`,
        params
      )
        .then((response) => {
          const data = response.data.data
          commit(Mutations.SET_USERS_ROLES, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.USERS_INVOICE]({ commit }, params) {
      return ApiServices.post(`${BASE_URL}/User/ToggleUserInvoice?userId=${params}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_USERS_INVOICE, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.DELETE_USER]({ commit }, params) {
      return ApiServices.delete(`${BASE_URL}/User/DeleteUser?userId=${params}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_DELETE_USER, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorUserAdministration(state) {
      return state.error
    },
    usersListsSuccess(state) {
      return state.userLists
    },
    userInvoiceSuccess(state) {
      return state.userInvoice
    },
    deleteUserSuccess(state) {
      return state.deleteUser
    }
  }
}

export default UserAdministrationModule
