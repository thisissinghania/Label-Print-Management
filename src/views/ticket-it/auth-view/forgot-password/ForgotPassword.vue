<template>
  <v-container fluid class="register-page forgot-page">
    <page-loader v-if="loader" />
    <v-col no-gutters class="register-middle-area forgot-middle-area pa-0">
      <v-col class="logo text-center pa-5 pb-0"
        ><img src="@/assets/ticket-it/images/logo.png" alt="logo"
      /></v-col>
      <v-col class="headline text-center pb-0">Forgot Your Password</v-col>
      <v-col class="subline text-center pt-0"
        >Please enter your username, we will sent an email to your email address</v-col
      >

      <v-col class="pa-md-6">
        <VeeForm id="register-form" @submit="submit" :validation-schema="validationSchema">
          <v-row>
            <v-col class="custom-field" cols="12" sm="12">
              <v-col class="pa-0 mb-1 field-label"><label>Username</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="username" type="text" />
              </v-col>
              <ErrorMessage name="username" />
            </v-col>

            <v-col cols="12" sm="12" class="regiter_footer mt-0">
              <v-col class="mb-3 pa-0 mx-auto" sm="12"
                ><fill-button class="w-100">Request Reset Link</fill-button></v-col
              >
              <v-col class="pa-0 already_account text-center"
                >Back to<router-link :to="`${TICKET_IT}/login`" class="ml-2"
                  >Login</router-link
                ></v-col
              >
            </v-col>
          </v-row>
        </VeeForm>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { defineComponent, watch, computed, ref } from 'vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { validationSchema } from '@/core/ticket-it/validations/ForgotPassword.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'forgot-password',
  components: {
    'fill-button': FillButton,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup() {
    const loader = ref(false)
    const store = useStore()
    const toast = useToast()

    const errorType = computed(() => {
      return store.getters.errorType
    })
    const forgotPassword = computed(() => {
      return store.getters.forgotPasswordSuccess
    })

    const submit = async (values, { resetForm }) => {
      await store.dispatch(Actions.FORGOT_PASSWORD, values)
      loader.value = true
      resetForm()
    }

    watch(errorType, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.error(errorType.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(forgotPassword, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.success(forgotPassword.value.successMessage, {
          position: 'top-right'
        })
      }
    })

    return {
      submit,
      validationSchema,
      TICKET_IT,
      loader
    }
  }
})
</script>
