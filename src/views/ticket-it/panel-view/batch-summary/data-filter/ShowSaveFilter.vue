<template>
  <popup-area :sizeSM="`12`" :sizeMD="`8`" :sizeLG="`6`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>All Saved filters</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <v-col class="pa-0">
        <table class="custom-table-design filter-table">
          <thead>
            <tr>
              <th>Filter Name</th>
              <th>IsDefault?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, i) in savedFilterList?.data" :key="i">
              <show-save-filter-table :data="data" />
            </tr>
          </tbody>
        </table>
      </v-col>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import ShowSaveFilterTable from '@/views/ticket-it/panel-view/batch-summary/data-filter/ShowSaveFilterTable.vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'

export default defineComponent({
  name: 'show-save-filter',
  components: {
    'popup-area': Popover,
    'page-loader': PageLoader,
    'show-save-filter-table': ShowSaveFilterTable
  },
  setup() {
    const loader = ref(true)
    const store = useStore()
    const toast = useToast()

    const savedFilterList = computed(() => {
      return store.getters.savedFilterListSuccess
    })
    const deleteFilterList = computed(() => {
      return store.getters.deleteFilterListSuccess
    })
    const updateFilterList = computed(() => {
      return store.getters.updateFilterListSuccess
    })

    watch(savedFilterList, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })

    const fetchAgainSavedList = async () => {
      await store.dispatch(Actions.SAVED_FILTER_LIST)
    }

    watch(deleteFilterList, (newValue) => {
      toast.clear()
      if (newValue) {
        fetchAgainSavedList()
        toast.success(deleteFilterList.value.successMessage, {
          position: 'top-right'
        })
      }
    })
    watch(updateFilterList, (newValue) => {
      toast.clear()
      if (newValue) {
        fetchAgainSavedList()
        toast.success(updateFilterList.value.successMessage, {
          position: 'top-right'
        })
      }
    })

    return {
      loader,
      savedFilterList
    }
  }
})
</script>
