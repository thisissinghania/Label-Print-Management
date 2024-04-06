<template>
  <tr>
    <td>
      <v-col class="product_img pa-0 d-flex align-center flex-wrap">
        <img :src="IMG_BASE_URL + tableRow?.originalSource" />
        <span class="ml-2">{{ tableRow?.fileName }}</span>
      </v-col>
    </td>
    <td>
      <v-col class="d-flex justify-end pa-0">
        <fill-button
          class="light-blue small-font-cta ml-2"
          @click="originalSrc(tableRow?.originalSource)"
          >Original</fill-button
        >
        <fill-button class="small-font-cta ml-2" @click="originalSrc(tableRow?.originalSource)"
          >PNG</fill-button
        >
        <fill-button
          class="dark-blue small-font-cta ml-2 same-width-cta"
          @click="addToCart(tableRow?.fileName)"
          :disabled="isDisabled"
          ><span v-if="!isDisabled">Add To Cart</span>
          <span v-if="isDisabled">Added</span></fill-button
        >
      </v-col>
    </td>
  </tr>
</template>

<script>
import { defineComponent, toRef, computed } from 'vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { IMG_BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'management-table',
  components: {
    'fill-button': FillButton
  },
  props: {
    tableData: {
      type: Object,
      required: false
    },
    cartListName: {
      type: Array,
      required: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const tableRow = toRef(props, 'tableData')
    const cartListNameVal = toRef(props, 'cartListName')

    const originalSrc = (value) => {
      window.open(IMG_BASE_URL + value)
    }

    const addToCart = async (filename) => {
      const formData = {
        fileName: filename
      }
      await store.dispatch(Actions.ADD_TO_CART, formData)
      emit('fetchCartList')
    }

    const isDisabled = computed(() => {
      return cartListNameVal.value?.includes(tableRow.value?.fileName)
    })

    return {
      tableRow,
      IMG_BASE_URL,
      originalSrc,
      addToCart,
      isDisabled
    }
  }
})
</script>
