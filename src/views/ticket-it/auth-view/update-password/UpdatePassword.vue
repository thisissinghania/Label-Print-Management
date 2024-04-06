<template>
  <v-container fluid class="register-page forgot-page">
    <page-loader v-if="loader" />
    <v-col no-gutters class="register-middle-area forgot-middle-area pa-0">
      <v-col class="logo text-center pa-5 pb-0"
        ><img src="@/assets/ticket-it/images/logo.png" alt="logo"
      /></v-col>
      <v-col class="headline text-center pb-0">Update Password</v-col>
      <v-col class="subline text-center pt-0"
        >Please enter your email address you'd like your password reset infomation sent to</v-col
      >

      <v-col class="pa-md-6">
        <VeeForm id="register-form" @submit="submit" :validation-schema="validationSchema">
          <v-row>
            <v-col class="custom-field" cols="12" sm="12">
              <v-col class="pa-0 mb-1 field-label"><label>Password</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="password" type="password" />
              </v-col>
              <ErrorMessage name="password" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="12">
              <v-col class="pa-0 mb-1 field-label"><label>Confirm Password</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="confirmPassword" type="password" />
              </v-col>
              <ErrorMessage name="confirmPassword" />
            </v-col>

            <v-col cols="12" sm="12" class="regiter_footer">
              <v-col class="pa-0 mx-auto" sm="12"
                ><fill-button class="w-100">Update Password</fill-button></v-col
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
import { validationSchema } from '@/core/ticket-it/validations/UpdatePassword.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'update-password',
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
    const router = useRouter()

    const errorType = computed(() => {
      return store.getters.errorType
    })
    const updatePassword = computed(() => {
      return store.getters.updatePasswordSuccess
    })

    const submit = async (values, { resetForm }) => {
      const token = new URLSearchParams(window.location.search).get('token')
      values.PasswordResetToken = token
      await store.dispatch(Actions.UPDATE_PASSWORD, values)
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
    watch(updatePassword, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.success(updatePassword.value.successMessage, {
          position: 'top-right'
        })
        router.push(`${TICKET_IT}/login`)
      }
    })

    return {
      submit,
      validationSchema,
      loader
    }
  }
})
</script>
