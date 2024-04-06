<template>
  <td>
    <span class="td-max-width-full">{{ tableRow?.name }}</span>
  </td>
  <td>
    <span class="td-max-width-full">{{ tableRow?.inventoryItems?.length }}</span>
  </td>
  <td>
    <span class="td-max-width-full">{{ tableRow?.description }}</span>
  </td>
  <td style="vertical-align: top">
    <button-with-icon @click="toggleModal()" class="green-bg"
      ><span><img src="@/assets/ticket-it/images/pencil.svg" /></span>
      <p>Create Batch From Promo</p></button-with-icon
    >
  </td>

  <create-pos-promotion-batch v-if="modalStatus" v-on:closeModal="toggleModal" />
</template>

<script>
import { defineComponent, toRef, ref } from 'vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import CreatePOSPromotion from '@/views/ticket-it/panel-view/latest-batches/create-pos-promotion/create-pos-promotion-batch/CreatePosPromotionBatch.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'table-view',
  components: {
    'button-with-icon': ButtonWithIcon,
    'create-pos-promotion-batch': CreatePOSPromotion
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

    const toggleModal = async () => {
      modalStatus.value = !modalStatus.value
      if (modalStatus.value) {
        const type = new URLSearchParams(window.location.search).get('type')
        const payload = {
          id: type,
          promoId: tableRow.value?.id,
          startDate: tableRow.value?.startDate || '',
          endDate: tableRow.value?.endDate,
          outletId: tableRow.value?.outletId || ''
        }
        await store.dispatch(Actions.POS_PROMOTION_MODAL_LIST, payload)
      }
    }

    console.log(tableRow, 'pawan')

    return {
      tableRow,
      toggleModal,
      modalStatus
    }
  }
})
</script>
