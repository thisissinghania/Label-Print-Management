<template>
  <popup-area :sizeSM="`12`" :sizeMD="`8`" :sizeLG="`6`">
    <template v-slot:modalTitle>
      <h3>Edit Account</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>

    <template v-slot:modalContent>
      <VeeForm id="editUser" @submit="submit" :validation-schema="validationSchema">
        <v-row>
          <v-col class="custom-field" cols="12" sm="6" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Username</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="login" type="text" v-model="formData.login" disabled />
            </v-col>
            <ErrorMessage name="login" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="6" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Email</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="email" type="email" v-model="formData.email" />
            </v-col>
            <ErrorMessage name="email" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="6" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>First Name</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="firstName" type="text" v-model="formData.firstName" />
            </v-col>
            <ErrorMessage name="firstName" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="6" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Last Name</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="lastName" type="text" v-model="formData.lastName" />
            </v-col>
            <ErrorMessage name="lastName" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="6" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Phone</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="phone" type="text" v-model="formData.phone" />
            </v-col>
            <ErrorMessage name="phone" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="6" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Address Line 1</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="addressLine1" type="text" v-model="formData.addressLine1" />
            </v-col>
            <ErrorMessage name="addressLine1" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="6" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Address Line 2</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="addressLine2" type="text" v-model="formData.addressLine2" />
            </v-col>
            <ErrorMessage name="addressLine2" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="6" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Store Category</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="storeCategory" type="text" v-model="formData.storeCategory" />
            </v-col>
            <ErrorMessage name="storeCategory" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="6" md="4">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Group</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="groupName" type="text" v-model="formData.groupName" />
            </v-col>
            <ErrorMessage name="groupName" />
          </v-col>
          <v-col class="custom-field" cols="12" sm="12" md="12">
            <v-col class="pa-0 mb-1 field-label bold-label"><label>Group</label></v-col>
            <v-col class="field-type pa-0">
              <Field name="tags" type="text" v-model="formData.tags" />
            </v-col>
            <ErrorMessage name="tags" />
          </v-col>
        </v-row>

        <v-col class="pa-0 mt-5">
          <button-with-icon class="green-bg"
            ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
            <p>Save</p></button-with-icon
          >
        </v-col>
        <page-loader v-if="loader" />
      </VeeForm>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, toRef, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { validationSchema } from '@/core/ticket-it/validations/RegionalManager.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'edit-user',
  components: {
    'popup-area': Popover,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  props: {
    tableRow: {
      type: Object,
      required: false
    }
  },
  setup(props, { emit }) {
    const loader = ref(false)
    const store = useStore()
    const toast = useToast()
    const editTableRow = toRef(props, 'tableRow')

    const formData = ref({
      login: editTableRow.value?.login,
      email: editTableRow.value?.email,
      firstName: editTableRow.value?.firstName,
      lastName: editTableRow.value?.lastName,
      phone: editTableRow.value?.phone,
      addressLine1: editTableRow.value?.addressLine1,
      addressLine2: editTableRow.value?.addressLine2,
      storeCategory: editTableRow.value?.storeCategory,
      groupName: editTableRow.value?.groupName,
      tags: editTableRow.value?.tags
    })

    const errorYourAccount = computed(() => {
      return store.getters.errorYourAccount
    })
    const updateCurrentUser = computed(() => {
      return store.getters.updateCurrentUserSuccess
    })

    const submit = async (values) => {
      loader.value = true
      const formValues = {
        ...values,
        userId: editTableRow.value?.userId,
        currentPassword: ''
      }
      await store.dispatch(Actions.UPDATE_CURRENT_USER, formValues)
    }

    watch(errorYourAccount, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.error(errorYourAccount.value.errorMessage, {
          position: 'top-right'
        })
      }
    })
    watch(updateCurrentUser, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        emit('closeModal')
        toast.success(updateCurrentUser.value.successMessage, {
          position: 'top-right'
        })
      }
    })

    return {
      validationSchema,
      submit,
      editTableRow,
      formData,
      loader
    }
  }
})
</script>
