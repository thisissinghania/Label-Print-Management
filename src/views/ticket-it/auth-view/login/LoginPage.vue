<template>
  <v-container fluid class="login-page">
    <page-loader v-if="loader" />
    <v-col no-gutters class="login-middle-area pa-0">
      <v-row no-gutters class="login-divider">
        <v-col cols="12" sm="12" md="6" lg="7" class="left-login-part pa-5 pa-lg-10">
          <v-col class="logo pa-0 mb-0 mb-md-10"
            ><img src="@/assets/ticket-it/images/logo.png" alt="logo"
          /></v-col>
          <v-col class="headline pa-0 pt-8">The ticketing solution that ticks all the boxes</v-col>
          <v-col class="content pa-0 mt-3"
            >In-store tickets are critical as part of the path to purchase. In any retail
            transaction, communicating accurate pricing, savings, product details and benefits can
            be the difference between getting a profitable sale and not getting a sale at
            all.</v-col
          >
          <v-col class="package-title mt-5 pa-0 d-none">
            <router-link :to="`${TICKET_IT}/plans`">
              <v-col class="pricing-headline">
                <h3>Pricing Packages</h3>
                <p>Explore affordable packages for every stage of your business</p>
              </v-col>
              <v-col-auto class="arrow-right">
                <img src="@/assets/ticket-it/images/go-next.svg" />
              </v-col-auto>
            </router-link>
          </v-col>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="5" class="right-login-part pa-5 pa-lg-10">
          <v-col class="headline pa-0 mt-0 mt-md-10">Welcome back!</v-col>
          <v-col class="subline pa-0 mb-10">Login to continue</v-col>
          <v-col class="form-area pa-0">
            <!-- form start -->
            <VeeForm id="login-form" @submit="submit" :validation-schema="validationSchema">
              <v-col class="pa-0 custom-field mb-5">
                <v-col class="pa-0 mb-1 field-label"><label>Username</label></v-col>
                <v-col class="field-type pa-0">
                  <Field name="login" type="text" placeholder="Enter your username" />
                </v-col>
                <ErrorMessage name="login" />
              </v-col>
              <v-col class="pa-0 custom-field">
                <v-col class="pa-0 mb-1 field-label"><label>Password</label></v-col>
                <v-col class="field-type pa-0">
                  <Field name="password" type="password" placeholder="Enter your password" />
                </v-col>
                <ErrorMessage name="password" />
              </v-col>
              <v-col class="pa-0">
                <v-row no-gutters>
                  <v-col sm="6" md="6" class="mt-3 mb-5 remember-me">
                    <label class="d-flex">
                      <Field name="remember" type="checkbox" value="remember" />
                      Remember me
                    </label>
                  </v-col>
                  <v-col sm="6" md="6" class="mt-3 mb-5 forgot-password"
                    ><router-link :to="`${TICKET_IT}/forgot-password`"
                      >Forgot Password</router-link
                    ></v-col
                  >
                </v-row>
              </v-col>
              <fill-button class="mt-5 w-100 mb-0">Sign In</fill-button>
              <v-col class="mb-md-10 forgot-password text-center"
                >Don't have an account?<router-link :to="`${TICKET_IT}/register`" class="ml-2"
                  >Register</router-link
                ></v-col
              >
            </VeeForm>
            <!-- form end -->
          </v-col>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { defineComponent, watch, computed, ref } from 'vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { validationSchema } from '@/core/ticket-it/validations/Login.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { getUserData } from '@/core/ticket-it/services/JWTService'
import {
  ADMIN,
  HEAD_OFFICE,
  REGIONAL_MANAGER,
  FRANCHISEE
} from '@/core/ticket-it/global/globalVariables'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'login-page',
  components: {
    'fill-button': FillButton,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup() {
    const loader = ref(false)
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const errorType = computed(() => {
      return store.getters.errorType
    })
    const loginSuccess = computed(() => {
      return store.getters.loginSuccess
    })

    const submit = async (values, { resetForm }) => {
      // eslint-disable-next-line no-unused-vars
      const { remember, ...data } = values
      await store.dispatch(Actions.LOGIN, data)
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
    watch(loginSuccess, async (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.success(loginSuccess.value.successMessage, {
          position: 'top-right'
        })
        const userRole = getUserData()
        const roleName = userRole?.role
        if (roleName === ADMIN) {
          await router.push({ name: 'user-administrator' })
        } else if (roleName === HEAD_OFFICE) {
          await router.push({ name: 'latest-batches' })
        } else if (roleName === REGIONAL_MANAGER) {
          await router.push({ name: 'batches-report' })
        } else if (roleName === FRANCHISEE) {
          await router.push({ name: 'latest-batches' })
        }
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
