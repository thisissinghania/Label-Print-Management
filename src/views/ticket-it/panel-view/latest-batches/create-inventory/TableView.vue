<template>
  <tr>
    <td>
      <span class="td-max-width-full">{{ tableRow?.itemSKUs }}</span>
    </td>
    <td style="vertical-align: top">
      <button-with-icon
        v-if="tableRow?.itemSKUs != ''"
        @click="toggleModal(tableRow?.id)"
        class="green-bg"
        ><span><img src="@/assets/ticket-it/images/pencil.svg" /></span>
        <p>Create Batch</p></button-with-icon
      >
    </td>
  </tr>

  <create-inventory-batch v-if="modalStatus" v-on:closeModal="toggleModal" />
</template>

<script>
import { defineComponent, toRef, ref } from 'vue'
import { formatDate } from '@/core/ticket-it/global/Utils.js'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import CreateInventoryBatch from '@/views/ticket-it/panel-view/latest-batches/create-inventory/create-inventory-batch/CreateInventoryBatch.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'table-view',
  components: {
    'button-with-icon': ButtonWithIcon,
    'create-inventory-batch': CreateInventoryBatch
  },
  props: {
    tableData: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const tableRow = toRef(props, 'tableData')
    let modalStatus = ref(false)
    const store = useStore()

    const toggleModal = async (listId) => {
      modalStatus.value = !modalStatus.value
      if (modalStatus.value) {
        await store.dispatch(Actions.INVENTORY_BATCH_MODAL_DATA, listId)
      }
    }

    return {
      tableRow,
      formatDate,
      toggleModal,
      modalStatus
    }
  }
})
</script>
