import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const ImageManagementModule = {
  state() {
    return {
      error: {},
      imageList: {},
      uploadImage: {},
      addToCart: {},
      cartList: {},
      removeCart: {},
      removeAllCart: {},
      shareLink: {},
      shareUserList: {},
      sendCartLink: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_IMAGE_LIST](state, payload) {
      state.imageList = payload
    },
    [Mutations.SET_UPLOAD_IMAGE](state, payload) {
      state.uploadImage = payload
    },
    [Mutations.SET_ADD_TO_CART](state, payload) {
      state.addToCart = payload
    },
    [Mutations.SET_CART_LIST](state, payload) {
      state.cartList = payload
    },
    [Mutations.SET_REMOVE_CART](state, payload) {
      state.removeCart = payload
    },
    [Mutations.SET_REMOVE_ALL_CART](state, payload) {
      state.removeAllCart = payload
    },
    [Mutations.SET_SHARE_LINK](state, payload) {
      state.shareLink = payload
    },
    [Mutations.SET_SHARE_USER_LIST](state, payload) {
      state.shareUserList = payload
    },
    [Mutations.SET_SEND_CART_LINK](state, payload) {
      state.sendCartLink = payload
    }
  },
  actions: {
    [Actions.IMAGE_LIST]({ commit }, params) {
      return ApiServices.post(`${BASE_URL}/ImageManagement/GetImagesByClient`, params)
        .then((response) => {
          const data = response.data.data
          commit(Mutations.SET_IMAGE_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.UPLOAD_IMAGE]({ commit }, params) {
      return ApiServices.post(`${BASE_URL}/ImageManagement/UploadImage`, params)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_UPLOAD_IMAGE, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.ADD_TO_CART]({ commit }, params) {
      return ApiServices.post(`${BASE_URL}/ImageManagement/AddToCart`, params)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_ADD_TO_CART, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CART_LIST]({ commit }) {
      return ApiServices.get(`${BASE_URL}/ImageManagement/ViewCartItems`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CART_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.REMOVE_CART]({ commit }, params) {
      return ApiServices.delete(
        `${BASE_URL}/ImageManagement/RemoveItemsFromCart?productName=${params}`
      )
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_REMOVE_CART, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.REMOVE_ALL_CART]({ commit }) {
      return ApiServices.delete(`${BASE_URL}/ImageManagement/RemoveAllItemsFromCart`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_REMOVE_ALL_CART, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SHARE_LINK]({ commit }) {
      return ApiServices.get(`${BASE_URL}/ImageManagement/GetShareLink`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SHARE_LINK, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SHARE_USER_LIST]({ commit }) {
      return ApiServices.get(`${BASE_URL}/ImageManagement/GetUsersByClient`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SHARE_USER_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.SEND_CART_LINK]({ commit }, params) {
      return ApiServices.post(`${BASE_URL}/ImageManagement/SendCart`, params)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_SEND_CART_LINK, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorImageManagement(state) {
      return state.error
    },
    imageListSuccess(state) {
      return state.imageList
    },
    uploadImageSuccess(state) {
      return state.uploadImage
    },
    addToCartSuccess(state) {
      return state.addToCart
    },
    cartListSuccess(state) {
      return state.cartList
    },
    removeCartSuccess(state) {
      return state.removeCart
    },
    removeAllCartSuccess(state) {
      return state.removeAllCart
    },
    shareLinkSuccess(state) {
      return state.shareLink
    },
    shareUserListSuccess(state) {
      return state.shareUserList
    },
    sendCartLinkSuccess(state) {
      return state.sendCartLink
    }
  }
}

export default ImageManagementModule
