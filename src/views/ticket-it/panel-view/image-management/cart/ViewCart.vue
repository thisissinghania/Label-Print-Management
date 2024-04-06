<template>
  <v-col-auto class="sidebar-panel cart-sidebar-panel">
    <v-col class="backdrop" @click="$emit('showCart')"></v-col>
    <v-col-auto class="sidebar-inside">
      <v-col class="sidebar-top">
        <v-col class="pa-0 switch-title">
          <p>Cart</p>
        </v-col>
        <button class="close" @click="$emit('showCart')">
          <img src="@/assets/ticket-it/images/close.svg" alt="close" />
        </button>
      </v-col>
      <v-col class="cart_clear d-flex justify-end"
        ><fill-button class="small-font-cta" @click="removeAllCart()"
          >Clear Cart</fill-button
        ></v-col
      >
      <v-col class="panels-listing pa-0">
        <ul v-if="cartListItems?.data?.length > 0">
          <li class="pa-3" v-for="(cartList, i) in cartListItems?.data" :key="i">
            <v-col>
              <v-row class="d-flex align-center">
                <v-col-auto class="image">
                  <img :src="IMG_BASE_URL + cartList?.clientImageDirectory"
                /></v-col-auto>
                <v-col class="data">
                  <h4>{{ cartList?.fileSize }}</h4>
                  <h4>{{ cartList?.fileName }}</h4>
                  <button class="mt-1" @click="removeCart(cartList?.fileName)">Remove</button>
                </v-col>
              </v-row>
            </v-col>
          </li>
        </ul>

        <v-col v-else>
          <v-col class="no-batch pa-5 text-center">
            <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
            <p>No Cart Items Found</p>
          </v-col>
        </v-col>
      </v-col>
      <v-col class="cart_footer d-flex justify-center" v-if="cartListItems?.data?.length > 0">
        <fill-button class="small-font-cta light-blue" @click="downloadCart()"
          >Download Cart</fill-button
        >
        <fill-button class="small-font-cta dark-blue ml-3" @click="shareCart()"
          ><span v-if="shareCartStatus">Hide Share</span><span v-else>Share Cart</span></fill-button
        >
      </v-col>
      <share-cart
        v-if="shareCartStatus"
        v-on:shareCart="shareCart"
        :shareLinkSuccess="shareLinkSuccess"
      />
    </v-col-auto>
  </v-col-auto>
</template>

<script>
import { defineComponent, toRef, computed, watch, ref } from 'vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import ShareCart from '@/views/ticket-it/panel-view/image-management/cart/ShareCart.vue'
import { cartData } from '@/core/ticket-it/data/cartData.js'
import { IMG_BASE_URL } from '@/store/ticket-it/BaseUrl'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'view-cart',
  components: {
    'fill-button': FillButton,
    'share-cart': ShareCart
  },
  props: {
    cartList: {
      type: Object,
      required: false
    }
  },
  setup(props, { emit }) {
    const toast = useToast()
    const store = useStore()
    const shareCartStatus = ref(false)
    const cartListItems = toRef(props, 'cartList')

    const removeCartSuccess = computed(() => {
      return store.getters.removeCartSuccess
    })
    const shareLinkSuccess = computed(() => {
      return store.getters.shareLinkSuccess
    })

    const shareCart = () => {
      shareCartStatus.value = !shareCartStatus.value
    }

    const LoadPageApi = async () => {
      if (cartListItems.value?.data?.length > 0) {
        await store.dispatch(Actions.SHARE_LINK)
      }
    }

    const downloadCart = () => {
      window.open(IMG_BASE_URL + shareLinkSuccess.value?.data)
    }

    const removeCart = async (fileName) => {
      await store.dispatch(Actions.REMOVE_CART, fileName)
      emit('fetchCartList')
    }
    const removeAllCart = async () => {
      if (cartListItems.value?.data?.length > 0) {
        await store.dispatch(Actions.REMOVE_ALL_CART)
        emit('fetchCartList')
      }
    }

    watch(removeCartSuccess, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success('Product Removed Successfully', {
          position: 'top-right'
        })
      }
    })

    // fetach share link api
    LoadPageApi()

    return {
      cartData,
      cartListItems,
      IMG_BASE_URL,
      removeCart,
      removeAllCart,
      shareCart,
      shareCartStatus,
      shareLinkSuccess,
      downloadCart
    }
  }
})
</script>
