<template>
  <popup-area :sizeSM="`12`" :sizeMD="`7`" :sizeLG="`5`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Assign ESL</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <VeeForm id="add-esl" @submit="submit" :validation-schema="validationSchema">
        <v-row>
          <v-col class="custom-field d-flex" cols="12" sm="12" md="12">
            <v-col class="pa-0">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>ESL Barcode</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="eslBarcode" type="text" v-model="eslBarCode" :disabled="eslBarCode" />
              </v-col>
              <ErrorMessage name="eslBarcode" />
            </v-col>
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="12">
            <v-col class="pa-0">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Add SKU</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="skuData" type="text" />
              </v-col>
              <ErrorMessage name="skuData" />
            </v-col>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="pt-0 d-flex justify-end">
            <fill-button class="small-font-cta dark-blue px-5 mt-1">Find</fill-button>
          </v-col>
          <v-col class="connection-list" v-if="skuDataVal">
            <ul>
              <li v-for="(value, title) in skuDataVal" :key="title">
                <strong>{{ title }}</strong>
                <span>{{ value }}</span>
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-col class="pa-0 mt-5 d-flex justify-end" v-if="skuDataVal">
          <button-with-icon type="button" @click="connectEsl()" class="green-bg"
            ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
            <p>Assign ESL</p></button-with-icon
          >
        </v-col>
      </VeeForm>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref, computed, watch, toRef } from 'vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import { validationSchema } from '@/core/ticket-it/validations/ConnectEsl.js'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
// import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'connect-esl',
  components: {
    'popup-area': Popover,
    'page-loader': PageLoader,
    'button-with-icon': ButtonWithIcon,
    'fill-button': FillButton,
    VeeForm,
    Field,
    ErrorMessage
  },
  props: {
    eslBarCodeData: {
      type: Number,
      required: false
    }
  },
  setup(props, { emit }) {
    const eslBarCode = toRef(props, 'eslBarCodeData')
    const loader = ref(false)
    const store = useStore()
    // const toast = useToast()
    const skuDataVal = ref()
    const skuNumber = ref()
    const getFindSkuId = ref()

    const errorEsl = computed(() => {
      return store.getters.errorEsl
    })
    const findSkuSuccess = computed(() => {
      return store.getters.findSkuSuccess
    })
    const connectEslSuccess = computed(() => {
      return store.getters.connectEslSuccess
    })

    const submit = async (values) => {
      loader.value = true
      await store.dispatch(Actions.FIND_SKU, { skuNumber: values?.skuData })
      skuNumber.value = values?.skuData
    }

    const connectEsl = async () => {
      loader.value = true
      const payload = {
        eslBarCode: eslBarCode.value,
        productSku: `${skuNumber.value}`,
        productId: `${getFindSkuId.value}`,
        scheduleNow: true
      }
      await store.dispatch(Actions.CONNECT_ESL, payload)
    }

    watch(errorEsl, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(findSkuSuccess, (newVal) => {
      if (newVal) {
        loader.value = false
        skuDataVal.value = JSON.parse(findSkuSuccess.value?.data)
        getFindSkuId.value = JSON.parse(findSkuSuccess.value?.data)?.id
      }
    })
    watch(connectEslSuccess, (newVal) => {
      if (newVal) {
        loader.value = false
        emit('closeModal')
      }
    })

    return {
      loader,
      submit,
      validationSchema,
      connectEsl,
      skuDataVal,
      eslBarCode
    }
  }
})
</script>
