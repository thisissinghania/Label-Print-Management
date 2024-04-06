<template>
  <v-col class="pa-0">
    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12">
          <v-col class="pa-0 subpage-title">Create User</v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="mt-2">
      <v-col class="shadow-block pa-md-5">
        <VeeForm id="create-inventory" @submit="submit" :validation-schema="validationSchema">
          <v-row>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>Upload New User Spreadsheet</label></v-col
              >
              <v-col class="field-type pa-0">
                <Field name="spreadsheet" type="file" class="custom-choose-file" />
              </v-col>
              <ErrorMessage name="spreadsheet" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>Select Head Office</label></v-col
              >
              <v-col class="field-type field-stype-select pa-0">
                <Field name="headOffice" as="select">
                  <option value="" disabled>Select</option>
                  <option :value="brands.value" v-for="(brands, i) in brandList" :key="i">
                    {{ brands.name }}
                  </option>
                </Field>
              </v-col>
              <ErrorMessage name="headOffice" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Regions</label></v-col>
              <v-col class="field-type field-stype-select pa-0">
                <Field name="region" as="select">
                  <option value="" disabled>Select</option>
                  <option value="nsw">NSW</option>
                  <option value="qld">QLD</option>
                  <option value="sa">SA</option>
                  <option value="tas">TAS</option>
                  <option value="vic">VIC</option>
                </Field>
              </v-col>
              <ErrorMessage name="region" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6">
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>Store Owner Groups</label></v-col
              >
              <v-col class="field-type field-stype-select pa-0">
                <Field name="storeOwner" as="select">
                  <option value="" disabled>Select</option>
                  <option :value="brands.value" v-for="(brands, i) in brandList" :key="i">
                    {{ brands.name }}
                  </option>
                </Field>
              </v-col>
              <ErrorMessage name="storeOwner" />
            </v-col>

            <v-col cols="12">
              <button-with-icon class="green-bg"
                ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
                <p>Submit</p></button-with-icon
              >
            </v-col>
          </v-row>
        </VeeForm>
      </v-col>
    </v-col>
  </v-col>
</template>

<script>
import { defineComponent } from 'vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import { brandList } from '@/core/ticket-it/data/brandList'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { validationSchema } from '@/core/ticket-it/validations/CreateUser.js'

export default defineComponent({
  name: 'create-user',
  components: {
    'button-with-icon': ButtonWithIcon,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup() {
    return {
      validationSchema,
      brandList
    }
  }
})
</script>
