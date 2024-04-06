import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions, Mutations } from '@/store/ticket-it/enums/StoreEnums.js'
import ApiServices from '@/core/ticket-it/services/ApiServices'

const InventoryModule = {
  state() {
    return {
      error: {},
      inventoryList: {},
      createInventory: {},
      inventoryBatchModalList: {},
      createBatchFromInventory: {}
    }
  },
  mutations: {
    [Mutations.SET_ERROR](state, payload) {
      state.error = payload
    },
    [Mutations.SET_INVENTORY_LIST](state, payload) {
      state.inventoryList = payload
    },
    [Mutations.SET_CREATE_INVENTORY](state, payload) {
      state.createInventory = payload
    },
    [Mutations.SET_INVENTORY_BATCH_MODAL_DATA](state, payload) {
      state.inventoryBatchModalList = payload
    },
    [Mutations.SET_CREATE_INVENTORY_BATCH](state, payload) {
      state.createBatchFromInventory = payload
    }
  },
  actions: {
    [Actions.INVENTORY_LIST]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Inventory/GetDataInventory`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_INVENTORY_LIST, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CREATE_INVENTORY]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Inventory/CreateInventory`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CREATE_INVENTORY, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.INVENTORY_BATCH_MODAL_DATA]({ commit }, param) {
      return ApiServices.get(`${BASE_URL}/Inventory/CreateBatchFromInventorySearch?id=${param}`)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_INVENTORY_BATCH_MODAL_DATA, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    },
    [Actions.CREATE_INVENTORY_BATCH]({ commit }, payload) {
      return ApiServices.post(`${BASE_URL}/Batch/CreateBatchFromInventory`, payload)
        .then((response) => {
          const data = response.data
          commit(Mutations.SET_CREATE_INVENTORY_BATCH, data)
        })
        .catch((error) => {
          commit(Mutations.SET_ERROR, error.response.data)
        })
    }
  },
  getters: {
    errorInventory(state) {
      return state.error
    },
    inventoryListSuccess(state) {
      return state.inventoryList
    },
    createInventorySuccess(state) {
      return state.createInventory
    },
    inventoryBatchModalListSuccess(state) {
      return state.inventoryBatchModalList
    },
    createBatchFromInventorySuccess(state) {
      return state.createBatchFromInventory
    }
  }
}

export default InventoryModule
