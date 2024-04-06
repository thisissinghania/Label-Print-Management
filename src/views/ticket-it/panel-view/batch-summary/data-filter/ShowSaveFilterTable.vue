<template>
  <td>{{ tableData?.batchFilterName }}</td>
  <td>
    <input
      name="isExact"
      type="checkbox"
      :checked="tableData?.isDefaultFilter == true"
      @change="
        changeinputVal(tableData?.id, tableData?.batchFilterName, tableData?.isDefaultFilter)
      "
    />
  </td>
  <td>
    <page-loader v-if="loader" />
    <fill-button
      type="button"
      @click="deleteSaveFilter(tableData?.id)"
      class="small-font-cta fixed-width pa-1"
      ><img src="@/assets/ticket-it/images/del.svg"
    /></fill-button>
  </td>
</template>

<script>
import { defineComponent, toRef, ref, computed, watch } from 'vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'show-save-filter-table',
  components: {
    'fill-button': FillButton,
    'page-loader': PageLoader
  },
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const store = useStore()
    const loader = ref(false)
    const tableData = toRef(props, 'data')

    const deleteFilterList = computed(() => {
      return store.getters.deleteFilterListSuccess
    })
    const updateFilterList = computed(() => {
      return store.getters.updateFilterListSuccess
    })

    const deleteSaveFilter = async (id) => {
      if (window.confirm('Are you sure you want to delete ?')) {
        loader.value = true
        await store.dispatch(Actions.DELETE_FILTER_LIST, id)
      }
    }

    const changeinputVal = async (id, filterName, defaultFilter) => {
      loader.value = true
      const payload = {
        id: id,
        filterName: filterName,
        isDefaultFilter: defaultFilter === false ? true : false
      }
      await store.dispatch(Actions.UPDATE_FILTER_LIST, payload)
    }

    watch(deleteFilterList, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(updateFilterList, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })

    return {
      tableData,
      deleteSaveFilter,
      loader,
      changeinputVal
    }
  }
})
</script>
