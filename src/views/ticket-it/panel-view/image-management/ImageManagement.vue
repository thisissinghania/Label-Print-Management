<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12" sm="6" md="4">
          <v-col class="pa-0 subpage-title">Image Management</v-col>
        </v-col>
        <v-col cols="12" sm="6" md="8" class="d-flex flex-wrap justify-sm-end">
          <fill-button
            class="light-blue small-font-cta mr-2"
            v-if="showAllButton"
            @click="showAllImages()"
            >Show All Images</fill-button
          >
          <v-col class="custom-field search-field-right pa-0 mr-2" md="7" lg="3">
            <v-col class="field-type pa-0">
              <VeeForm id="search-form">
                <Field
                  name="search"
                  type="text"
                  placeholder="Search"
                  v-model="params.searchString"
                />
                <button class="search_icon" type="button" @click="searchImageList()">
                  <svg-icon type="mdi" :path="mdiMagnify"></svg-icon>
                </button>
              </VeeForm>
            </v-col>
          </v-col>

          <fill-button class="green-bg small-font-cta" @click="uploadNewAsset()"
            >Upload Assets</fill-button
          >
          <fill-button class="dark-blue small-font-cta ms-2" @click="showCart()">
            <svg-icon type="mdi" :path="mdiCart"></svg-icon>
          </fill-button>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="mt-2 table-data" v-if="imageList?.data && imageList?.data?.length > 0">
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th>Product</th>
            <th style="text-align: left; width: 290px">Action</th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody v-for="(tableData, i) in imageList?.data" :key="i">
            <management-table
              :tableData="tableData"
              :cartListName="cartListName"
              v-on:fetchCartList="fetchCartList"
            />
          </tbody>
        </template>
      </table-structure>
    </v-col>

    <v-col v-else>
      <v-col class="no-batch pa-5 text-center" v-if="showBatchLoading">
        <v-progress-circular :width="4" color="green" indeterminate></v-progress-circular>
        <p class="mt-4">Please Wait...</p>
      </v-col>
      <v-col class="no-batch pa-5 text-center" v-else>
        <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
        <p>No Image Available</p>
      </v-col>
    </v-col>

    <pagination-list :data="imageList" @update-page="updatePage" />
    <upload-assets
      v-if="uploadAssetsStatus"
      v-on:closeModal="uploadNewAsset"
      v-on:fetchImages="fetchImages"
    />
    <view-cart
      v-if="cartStatus"
      v-on:showCart="showCart"
      :cartList="cartList"
      v-on:fetchCartList="fetchCartList"
      v-on:fetchImages="fetchImages"
    />
  </v-col>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import TableStructure from '@/components/ticket-it/table/TableStructure.vue'
import ManagementTable from '@/views/ticket-it/panel-view/image-management/ManagementTable.vue'
import PaginationList from '@/components/ticket-it/pagination/paginationList.vue'
import UploadAssets from '@/views/ticket-it/panel-view/image-management/upload-assets/UploadAssets.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import ViewCart from '@/views/ticket-it/panel-view/image-management/cart/ViewCart.vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMagnify } from '@mdi/js'
import { Field, Form as VeeForm } from 'vee-validate'
import { mdiCart } from '@mdi/js'

export default defineComponent({
  name: 'image-management',
  components: {
    'fill-button': FillButton,
    'table-structure': TableStructure,
    'management-table': ManagementTable,
    'pagination-list': PaginationList,
    'upload-assets': UploadAssets,
    'view-cart': ViewCart,
    'page-loader': PageLoader,
    SvgIcon,
    Field,
    VeeForm
  },
  setup() {
    const showBatchLoading = ref(true)
    let uploadAssetsStatus = ref(false)
    const cartStatus = ref(false)
    const loader = ref(false)
    const store = useStore()
    const toast = useToast()
    const cartListName = ref('')
    const showAllButton = ref(false)
    const params = ref({
      pageNumber: 1,
      pageSize: 10,
      searchString: ''
    })

    const uploadNewAsset = () => {
      uploadAssetsStatus.value = !uploadAssetsStatus.value
    }

    const error = computed(() => {
      return store.getters.errorImageManagement
    })
    const imageList = computed(() => {
      return store.getters.imageListSuccess
    })
    const addToCart = computed(() => {
      return store.getters.addToCartSuccess
    })
    const cartList = computed(() => {
      return store.getters.cartListSuccess
    })
    const removeAllCartSuccess = computed(() => {
      return store.getters.removeAllCartSuccess
    })

    const showCart = async () => {
      cartStatus.value = !cartStatus.value
    }

    const getCartImageName = () => {
      cartListName.value = cartList.value?.data?.map((items) => items.fileName)
    }

    const fetchCartList = async () => {
      await store.dispatch(Actions.CART_LIST)
      getCartImageName()
    }

    const fetchImages = async () => {
      await store.dispatch(Actions.IMAGE_LIST, params.value)
      loader.value = false

      setTimeout(() => {
        showBatchLoading.value = false
      }, 5000)
    }

    const searchImageList = async () => {
      loader.value = true
      showAllButton.value = true
      fetchImages()
    }

    const showAllImages = () => {
      loader.value = true
      showAllButton.value = false
      params.value.searchString = ''
      fetchImages()
    }

    // pagination select page show limit
    const updatePage = (page, pageSize) => {
      params.value.pageNumber = page
      params.value.pageSize = pageSize
      loader.value = true
      fetchImages()
    }

    watch(error, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.error(error.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(imageList, (newValue) => {
      if (newValue) {
        loader.value = false
      }
    })
    watch(addToCart, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success('Product Added Successfully', {
          position: 'top-right'
        })
      }
    })
    watch(removeAllCartSuccess, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(removeAllCartSuccess.value.successMessage, {
          position: 'top-right'
        })
        cartListName.value = ''
      }
    })

    // Calling the images list api
    fetchImages()
    fetchCartList()

    return {
      mdiMagnify,
      uploadAssetsStatus,
      uploadNewAsset,
      updatePage,
      imageList,
      loader,
      fetchImages,
      showCart,
      cartStatus,
      mdiCart,
      cartList,
      cartListName,
      fetchCartList,
      showBatchLoading,
      searchImageList,
      params,
      showAllButton,
      showAllImages
    }
  }
})
</script>
