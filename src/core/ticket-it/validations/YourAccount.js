import * as yup from 'yup'
// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validationSchema = yup.object({
  login: yup.string().required('Username is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup
    .string()
    // .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required'),
  email: yup
    .string()
    .required('Email is required')
    .email()
    .matches(/^(?!.*@[^,]*,)/),
  addressLine1: yup.string().required('Address Line 1 is required'),
  currentPassword: yup.string().required('Current Password is required'),
  changePassword: yup
    .string()
    .test('password-length', 'Password must be 6 characters long', function (value) {
      if (value && value.length < 6) {
        return false
      }
      return true
    })
    .test('password-uppercase', 'Password requires an uppercase letter', function (value) {
      if (value && !/[A-Z]/.test(value)) {
        return false
      }
      return true
    })
    .test('password-lowercase', 'Password requires a lowercase letter', function (value) {
      if (value && !/[a-z]/.test(value)) {
        return false
      }
      return true
    })
    .test('password-symbol', 'Password requires a symbol', function (value) {
      if (value && !/[^\w]/.test(value)) {
        return false
      }
      return true
    })
    .test('password-number', 'Password requires a number', function (value) {
      if (value && !/[0-9]/.test(value)) {
        return false
      }
      return true
    })
    .nullable(),
  confirmPass: yup
    .string()
    .oneOf([yup.ref('changePassword'), null], 'Password and confirm password are not same')
})
