import * as yup from 'yup'
// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validationSchema = yup.object({
  login: yup.string().required('Username is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email()
    .matches(/^(?!.*@[^,]*,)/),
  phone: yup
    .string()
    // .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required'),
  addressLine1: yup.string().required('Address Line 1 is required'),
  userPassword: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be 6 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('userPassword'), null], 'Passwords must match'),
  client: yup.string().required('Client is required'),
  regionName: yup.string().required('Region is required'),
  posProvider: yup.string().required('POS provider is required')
})
