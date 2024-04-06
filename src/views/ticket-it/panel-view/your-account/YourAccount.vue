<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12">
          <v-col class="pa-0 subpage-title">Edit Account</v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="mt-2" v-if="currentUserDetail?.login">
      <v-col class="shadow-block pa-md-5">
        <VeeForm id="create-inventory" @submit="submit" :validation-schema="validationSchema">
          <v-row>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Username</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="login" type="text" v-model="formData.login" disabled />
              </v-col>
              <ErrorMessage name="login" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Email</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="email" type="email" v-model="formData.email" />
              </v-col>
              <ErrorMessage name="email" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>First Name</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="firstName" type="text" v-model="formData.firstName" />
              </v-col>
              <ErrorMessage name="firstName" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Last Name</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="lastName" type="text" v-model="formData.lastName" />
              </v-col>
              <ErrorMessage name="lastName" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Phone</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="phone" type="text" v-model="formData.phone" />
              </v-col>
              <ErrorMessage name="phone" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Address Line 1</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="addressLine1" type="text" v-model="formData.addressLine1" />
              </v-col>
              <ErrorMessage name="addressLine1" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Address Line 2</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="addressLine2" type="text" v-model="formData.addressLine2" />
              </v-col>
              <ErrorMessage name="addressLine2" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>Current Password</label></v-col
              >
              <v-col class="field-type pa-0">
                <Field name="currentPassword" type="password" v-model="formData.currentPassword" />
              </v-col>
              <ErrorMessage name="currentPassword" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Change Password</label></v-col>
              <v-col class="field-type pa-0">
                <Field name="changePassword" type="password" v-model="formData.changePassword" />
              </v-col>
              <ErrorMessage name="changePassword" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"
                ><label>Confirm New Password</label></v-col
              >
              <v-col class="field-type pa-0">
                <Field name="confirmPass" type="password" v-model="formData.confirmPass" />
              </v-col>
              <ErrorMessage name="confirmPass" />
            </v-col>

            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Store Category</label></v-col>
              <v-col class="field-type pa-0">
                <Field
                  name="storeCategory"
                  type="text"
                  placeholder="Add multiple category by seprated comma"
                  v-model="formData.storeCategory"
                />
              </v-col>
              <ErrorMessage name="storeCategory" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Group</label></v-col>
              <v-col class="field-type pa-0">
                <Field
                  name="groupName"
                  type="text"
                  placeholder="Add multiple group by seprated comma"
                  v-model="formData.groupName"
                />
              </v-col>
              <ErrorMessage name="groupName" />
            </v-col>
            <v-col class="custom-field" cols="12" sm="6" md="4" lg="3">
              <v-col class="pa-0 mb-1 field-label bold-label"><label>Tags</label></v-col>
              <v-col class="field-type pa-0">
                <Field
                  name="tags"
                  type="text"
                  placeholder="Add multiple tags by seprated comma"
                  v-model="formData.tags"
                />
              </v-col>
              <ErrorMessage name="tags" />
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

    <v-col v-else>
      <v-col class="no-batch pa-5 text-center" v-if="showBatchLoading">
        <v-progress-circular :width="4" color="green" indeterminate></v-progress-circular>
        <p class="mt-4">Please Wait...</p>
      </v-col>
      <v-col class="no-batch pa-5 text-center" v-else>
        <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
        <p>No Data Available</p>
      </v-col>
    </v-col>
  </v-col>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { validationSchema } from '@/core/ticket-it/validations/YourAccount.js'
import { useStore } from 'vuex'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useToast } from 'vue-toast-notification'
import { getUserData } from '@/core/ticket-it/services/JWTService'

export default defineComponent({
  name: 'your-account',
  components: {
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup() {
    const showBatchLoading = ref(true)
    const currentUserId = getUserData()?.UserId
    const loader = ref(false)
    const store = useStore()
    const toast = useToast()
    const formData = ref({
      login: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      storeCategory: '',
      groupName: '',
      currentPassword: '',
      changePassword: '',
      confirmPass: '',
      tags: ''
    })

    const currentUserDetail = computed(() => {
      return store.getters.currentUserDetailSuccess
    })
    const updateCurrentUser = computed(() => {
      return store.getters.updateCurrentUserSuccess
    })
    const errorYourAccount = computed(() => {
      return store.getters.errorYourAccount
    })

    const fetchUserData = async () => {
      await store.dispatch(Actions.CURRENT_USER_DETAIL)
      setTimeout(() => {
        showBatchLoading.value = false
      }, 5000)
    }

    const submit = async (values, { resetForm }) => {
      loader.value = true
      const formValues = {
        ...values,
        userId: currentUserId
      }
      await store.dispatch(Actions.UPDATE_CURRENT_USER, formValues)
      resetForm()
      fetchUserData()
    }

    // fetching user detail
    fetchUserData()

    watch(currentUserDetail, (newVal) => {
      formData.value.login = newVal?.login
      formData.value.email = newVal?.email
      formData.value.firstName = newVal?.firstName
      formData.value.lastName = newVal?.lastName
      formData.value.phone = newVal?.phone
      formData.value.addressLine1 = newVal?.addressLine1
      formData.value.addressLine2 = newVal?.addressLine2
      formData.value.storeCategory = newVal?.storeCategory
      formData.value.groupName = newVal?.groupName
      formData.value.tags = newVal?.tags
    })

    watch(errorYourAccount, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.error(errorYourAccount.value.errorMessage, {
          position: 'top-right'
        })
        loader.value = false
      }
    })
    watch(updateCurrentUser, (newValue) => {
      toast.clear()
      if (newValue) {
        toast.success(updateCurrentUser.value.successMessage, {
          position: 'top-right'
        })
        loader.value = false
      }
    })

    return {
      validationSchema,
      formData,
      submit,
      loader,
      currentUserDetail,
      showBatchLoading
    }
  }
})
</script>
