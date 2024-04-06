<template>
  <tr>
    <td>
      <span class="td-max-width-sku">{{ tableRow?.poId }}</span>
    </td>
    <td>{{ tableRow?.supplierInvoiceNo }}</td>
    <td>{{ formatDate(tableRow?.dateModified) }}</td>
    <td>
      <span class="td-max-width-sku">{{ Object.keys(tableRow?.itemSKUs).join(', ') }}</span>
    </td>
    <td>
      <button-with-icon @click="toggleModal(tableRow?.id)" class="green-bg"
        ><span><img src="@/assets/ticket-it/images/pencil.svg" /></span>
        <p>Create Batch</p></button-with-icon
      >
    </td>
  </tr>

  <create-po-batch v-if="modalStatus" v-on:closeModal="toggleModal" />
</template>

<script>
import { defineComponent, toRef, ref } from 'vue'
import { formatDate } from '@/core/ticket-it/global/Utils.js'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import CreatePoBatch from '@/views/ticket-it/panel-view/latest-batches/create-pos-purchase-order/create-po-batch/CreatePoBatch.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'table-view',
  components: {
    'button-with-icon': ButtonWithIcon,
    'create-po-batch': CreatePoBatch
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
        await store.dispatch(Actions.BATCH_PO_DETAIL, listId)
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
