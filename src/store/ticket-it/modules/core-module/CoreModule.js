import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const CoreModule = {
  state() {
    return {
      error: {},
      coreToggleUpdate: {},
      coreFileUpload: {},
      coreListData: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_CORE_TOGGLE_UPDATE](state, payload) {
      state.coreToggleUpdate = payload
    },
    [Mutations.SET_CORE_FILE_UPLOAD](state, payload) {
      state.coreFileUpload = payload
    },
    [Mutations.SET_CORE_LIST_DATA](state, payload) {
      state.coreListData = payload
    }
  },
  actions: {
    [Actions.CORE_TOGGLE_UPDATE]({ commit }, params) {
      return ApiServices.post(`${BASE_URL}/Core/ToggleUpdateStatus?coredatasourceId=${params}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CORE_TOGGLE_UPDATE, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CORE_FILE_UPLOAD]({ commit }, { url, formData }) {
      return ApiServices.post(`${BASE_URL}/Core/CoreFileUpload/${url}`, formData)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CORE_FILE_UPLOAD, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CORE_LIST_DATA]({ commit }, { url }) {
      return ApiServices.get(`${BASE_URL}/Core/GetCoreUploadModel/${url}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CORE_LIST_DATA, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorCoreMaster(state) {
      return state.error
    },
    coreToggleUpdateSuccess(state) {
      return state.coreToggleUpdate
    },
    coreFileUploadSuccess(state) {
      return state.coreFileUpload
    },
    coreListDataSuccess(state) {
      return state.coreListData
    }
  }
}

export default CoreModule
