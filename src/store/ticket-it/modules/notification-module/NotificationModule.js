import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const NotificationModule = {
  state() {
    return {
      error: {},
      allRegions: {},
      allTags: {},
      allCategories: {},
      allLogins: {},
      sendBatchNotification: {},
      emailTemplate: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_ALL_REGIONS](state, payload) {
      state.allRegions = payload
    },
    [Mutations.SET_ALL_TAGS](state, payload) {
      state.allTags = payload
    },
    [Mutations.SET_ALL_CATEGORIES](state, payload) {
      state.allCategories = payload
    },
    [Mutations.SET_ALL_LOGINS](state, payload) {
      state.allLogins = payload
    },
    [Mutations.SET_SEND_BATCH_NOTIFICATION](state, payload) {
      state.sendBatchNotification = payload
    },
    [Mutations.SET_EMAIL_TEMPLATE](state, payload) {
      state.emailTemplate = payload
    }
  },
  actions: {
    [Actions.ALL_REGIONS]({ commit }) {
      return ApiServices.get(`${BASE_URL}/Batch/GetRegionsByClient`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_ALL_REGIONS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.ALL_TAGS]({ commit }) {
      return ApiServices.get(`${BASE_URL}/Batch/GetUserTagsByClient`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_ALL_TAGS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.ALL_CATEGORIES]({ commit }) {
      return ApiServices.get(`${BASE_URL}/Batch/GetUserStoreCategoriesByClient`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_ALL_CATEGORIES, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.ALL_LOGINS]({ commit }, params) {
      return ApiServices.post(`${BASE_URL}/Batch/GetLoginsByRegion`, params)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_ALL_LOGINS, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SEND_BATCH_NOTIFICATION]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/SendBatchNotification`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SEND_BATCH_NOTIFICATION, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.EMAIL_TEMPLATE]({ commit }, params) {
      return ApiServices.post(`${BASE_URL}/Batch/GetBatchEmailTemplate?batchId=${params}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_EMAIL_TEMPLATE, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorNotification(state) {
      return state.error
    },
    allRegionsSuccess(state) {
      return state.allRegions
    },
    allTagsSuccess(state) {
      return state.allTags
    },
    allCategoriesSuccess(state) {
      return state.allCategories
    },
    allLoginsSuccess(state) {
      return state.allLogins
    },
    sendBatchNotificationSuccess(state) {
      return state.sendBatchNotification
    },
    emailTemplateSuccess(state) {
      return state.emailTemplate
    }
  }
}

export default NotificationModule
