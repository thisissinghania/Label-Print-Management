<template>
  <popup-area :sizeSM="`12`" :sizeMD="`7`" :sizeLG="`4`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Add Credit Card</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <VeeForm id="card-form" @submit="submit" :validation-schema="validationSchema">
        <v-row>
          <v-col class="custom-field" cols="12" sm="12">
            <v-col class="pa-0 mb-1 field-label"><label>Card Holder Name</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="holderName" type="text" />
            </v-col>
            <ErrorMessage name="holderName" />
          </v-col>

          <v-col class="custom-field" cols="12" sm="12">
            <v-col class="pa-0 mb-1 field-label"><label>Card Number</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="cardNumber" type="text" maxlength="16" />
            </v-col>
            <ErrorMessage name="cardNumber" />
          </v-col>

          <v-col class="custom-field" cols="12" sm="6">
            <v-col class="pa-0 mb-1 field-label"><label>Expiration Date</label></v-col>
            <v-row>
              <v-col cols="12" sm="6">
                <v-col class="field-type field-stype-select pa-0">
                  <Field name="month" as="select">
                    <option value="" disabled>Select Month</option>
                    <option :value="months" v-for="(months, i) in creditCardMonths" :key="i">
                      {{ months }}
                    </option>
                  </Field>
                </v-col>
                <ErrorMessage name="month" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-col class="field-type field-stype-select pa-0">
                  <Field name="year" as="select">
                    <option value="" disabled>Select Year</option>
                    <option :value="years" v-for="(years, i) in creditCardYears" :key="i">
                      {{ years }}
                    </option>
                  </Field>
                </v-col>
                <ErrorMessage name="year" />
              </v-col>
            </v-row>
          </v-col>

          <v-col class="custom-field" cols="12" sm="6">
            <v-col class="pa-0 mb-1 field-label"><label>CVV</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="cvv" type="text" maxlength="4" />
            </v-col>
            <ErrorMessage name="cvv" />
          </v-col>

          <v-col class="custom-field" cols="12" sm="12">
            <fill-button type="submit" class="small-font-cta green-bg">Add Card</fill-button>
          </v-col>
        </v-row>
      </VeeForm>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { validationSchema } from '@/core/ticket-it/validations/CardPayment.js'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { getCurrentYear } from '@/core/ticket-it/global/Utils.js'

export default defineComponent({
  name: 'add-card',
  components: {
    'popup-area': Popover,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage,
    'fill-button': FillButton
  },
  setup() {
    const loader = ref(false)
    const creditCardYears = ref([])
    const creditCardMonths = ref([])

    const generateCreditCardYears = () => {
      const currentYear = getCurrentYear()
      for (let i = currentYear; i <= currentYear + 12; i++) {
        creditCardYears.value.push(i.toString())
      }
    }
    generateCreditCardYears()

    const generateCreditCardMonths = () => {
      const currentMonth = Number(1)
      for (let i = currentMonth; i <= 12; i++) {
        const month = i < 10 ? `0${i}` : `${i}`
        creditCardMonths.value.push(month)
      }
    }
    generateCreditCardMonths()

    const submit = () => {
      alert('wef')
    }

    return {
      loader,
      validationSchema,
      submit,
      creditCardYears,
      creditCardMonths
    }
  }
})
</script>
