<template>
  <v-col class="share-cart">
    <page-loader v-if="loader" />
    <v-col class="sidebar-top">
      <v-col class="pa-0 switch-title">
        <p>Share Cart</p>
      </v-col>
      <button class="close" @click="$emit('shareCart')">
        <img src="@/assets/ticket-it/images/close.svg" alt="close" />
      </button>
    </v-col>
    <VeeForm id="share-cart" @submit="submit" class="w-100" :validation-schema="validationSchema">
      <v-row>
        <v-col class="custom-field" cols="12">
          <v-col class="pa-0 mb-1 field-label bold-label"
            ><label>Your file share link</label></v-col
          >
          <v-col class="field-type field-stype-select pa-0">
            <Field type="text" name="Url" v-model="formData.Url" />
          </v-col>
          <ErrorMessage name="Url" />
        </v-col>
        <v-col class="custom-field" cols="12">
          <v-col class="pa-0 mb-1 field-label bold-label"
            ><label>Send to another user</label></v-col
          >
          <v-col class="field-type field-stype-select pa-0">
            <Field name="UserName" as="select" v-model="formData.UserName">
              <option value="" disabled>Select</option>
              <option :value="userData" v-for="(userData, i) in shareUserList?.data" :key="i">
                {{ userData }}
              </option>
            </Field>
          </v-col>
          <ErrorMessage name="UserName" />
        </v-col>
      </v-row>
      <fill-button class="small-font-cta dark-blue mt-6 w-100">Send</fill-button>
    </VeeForm>
  </v-col>
</template>

<script>
import { defineComponent, computed, ref, watch, toRef } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { validationSchema } from '@/core/ticket-it/validations/SendCart.js'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { IMG_BASE_URL } from '@/store/ticket-it/BaseUrl'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'share-cart',
  components: {
    'fill-button': FillButton,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  props: {
    shareLinkSuccess: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const shareLink = toRef(props, 'shareLinkSuccess')
    const loader = ref(false)
    const toast = useToast()
    const store = useStore()
    const formData = ref({
      Url: IMG_BASE_URL + shareLink.value?.data,
      UserName: ''
    })

    const error = computed(() => {
      return store.getters.errorImageManagement
    })
    const shareUserList = computed(() => {
      return store.getters.shareUserListSuccess
    })
    const sendCartLink = computed(() => {
      return store.getters.sendCartLinkSuccess
    })

    const LoadPageApi = async () => {
      await store.dispatch(Actions.SHARE_USER_LIST)
    }

    const submit = async (values) => {
      loader.value = true
      await store.dispatch(Actions.SEND_CART_LINK, values)
    }

    watch(error, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
      }
    })
    watch(sendCartLink, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(sendCartLink.value.successMessage, {
          position: 'top-right'
        })
        loader.value = false
      }
    })

    // fetach share link api
    LoadPageApi()

    return {
      submit,
      formData,
      shareUserList,
      loader,
      validationSchema
    }
  }
})
</script>
