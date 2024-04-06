<template>
  <v-container fluid class="register-page">
    <v-col no-gutters class="register-middle-area pa-0">
      <v-col class="logo text-center"
        ><img src="@/assets/ticket-it/images/logo.png" alt="logo"
      /></v-col>
      <v-col class="headline text-center pb-0">Create New Account</v-col>
      <v-col class="subline text-center pt-0">Register to continue</v-col>

      <v-col class="pa-md-6">
        <VeeForm id="register-form" @submit="submit" :validation-schema="validationSchema">
          <v-row>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>First Name</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="firstName" type="text" />
              </v-col>
              <ErrorMessage name="firstName" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>Last Name</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="lastName" type="text" />
              </v-col>
              <ErrorMessage name="lastName" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>Username</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="login" type="text" />
              </v-col>
              <ErrorMessage name="login" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>Email</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="email" type="text" />
              </v-col>
              <ErrorMessage name="email" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>Phone</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="phone" type="text" />
              </v-col>
              <ErrorMessage name="phone" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>Address Line 1</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="addressLine1" type="text" />
              </v-col>
              <ErrorMessage name="addressLine1" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>Address Line 2</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="addressLine2" type="text" />
              </v-col>
              <ErrorMessage name="addressLine2" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>Password</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="userPassword" type="password" />
              </v-col>
              <ErrorMessage name="userPassword" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>Confirm Password</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="confirmPassword" type="password" />
              </v-col>
              <ErrorMessage name="confirmPassword" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>Client</label></v-col>
              <v-col class="field-type field-stype-select pa-0">
                <Field name="client" as="select" @change="getRegion($event)">
                  <option value="" disabled>Select</option>
                  <option :value="clients.name" v-for="(clients, i) in dynamicClients" :key="i">
                    {{ clients.name }}
                  </option>
                </Field>
              </v-col>
              <ErrorMessage name="client" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>Region</label></v-col>
              <v-col class="field-type field-stype-select pa-0">
                <Field
                  name="regionName"
                  as="select"
                  :disabled="regionVal.length === 0"
                  v-model="formData.regionName"
                >
                  <option value="" disabled>Select</option>
                  <option :value="region.Name" v-for="(region, i) in regionVal" :key="i">
                    {{ region.Name }}
                  </option>
                </Field>
              </v-col>
              <ErrorMessage name="regionName" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label"><label>POS Provider</label></v-col>
              <v-col class="field-type field-stype-select pa-0">
                <Field @change="posProvider($event)" name="posProvider" as="select">
                  <option value="" disabled>Select</option>
                  <option value="retailExpress">Retail Express</option>
                  <option value="vend">Vend</option>
                  <option value="shopFront">Shop Front</option>
                  <option value="dear">Dear</option>
                  <option value="netsuite">Netsuite</option>
                </Field>
              </v-col>
              <ErrorMessage name="posProvider" />
            </v-col>
            <v-col
              class="custom-field"
              cols="12"
              sm="6"
              v-for="(allInputs, i) in filterObject[0]?.value"
              :key="i"
            >
              <v-col class="pa-0 mb-1 field-label"
                ><label>{{ allInputs.label }}</label></v-col
              >
              <v-col class="field-type pa-0">
                <Field :name="allInputs.name" type="text" />
              </v-col>
              <ErrorMessage :name="allInputs.name" />
            </v-col>

            <v-col cols="12" sm="12" class="regiter_footer mt-5">
              <v-col class="mb-3 pa-0 mx-auto" sm="5"
                ><fill-button class="w-100">Sign Up</fill-button></v-col
              >
              <v-col class="pa-0 already_account text-center"
                >Already have an account?<router-link :to="`${TICKET_IT}/login`" class="ml-2"
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
import { defineComponent, ref, computed, watch } from 'vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { validationSchema } from '@/core/ticket-it/validations/Register.js'
import { registerInputs } from '@/core/ticket-it/data/registerInputs.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'register-page',
  components: {
    'fill-button': FillButton,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup() {
    const store = useStore()
    const toast = useToast()
    let filterObject = ref([])
    let regionVal = ref([])
    const formData = ref({
      regionName: ''
    })

    const errorType = computed(() => {
      return store.getters.errorType
    })
    const registerUser = computed(() => {
      return store.getters.registerUserSuccess
    })
    const dynamicClients = computed(() => {
      return store.getters.dynamicClientsList
    })

    const posProvider = (event) => {
      const selectedvalue = event.target.value.toLowerCase()
      filterObject.value = registerInputs.filter(
        (item) => item.label.toLowerCase() == selectedvalue
      )
    }

    const getRegion = (event) => {
      const selectedClient = event.target.value
      const selectedClientData = dynamicClients.value.find(
        (item) => item.displayName === selectedClient
      )
      if (selectedClientData) {
        regionVal.value = JSON.parse(selectedClientData.regions)
      } else {
        regionVal.value = []
      }
      formData.value.regionName = ''
    }

    const fetchDynamicClients = async () => {
      await store.dispatch(Actions.DYNAMIC_CLIENTS)
    }

    const submit = async (values, { resetForm }) => {
      await store.dispatch(Actions.REGISTER_USER, values)
      resetForm()
    }

    watch(errorType, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.error(errorType.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(registerUser, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(registerUser.value.successMessage, {
          position: 'top-right'
        })
      }
    })

    // Calling the client api
    fetchDynamicClients()

    return {
      getRegion,
      dynamicClients,
      submit,
      validationSchema,
      TICKET_IT,
      registerInputs,
      posProvider,
      filterObject,
      regionVal,
      formData
    }
  }
})
</script>
