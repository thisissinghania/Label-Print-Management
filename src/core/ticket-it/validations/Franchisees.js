import * as yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email()
    .matches(/^(?!.*@[^,]*,)/),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required'),
  address1: yup.string().required('Address 1 is required'),
  group: yup.string().required('Group is required'),
  storeCategory: yup.string().required('Store category is required'),
  region: yup.string().required('Region is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  postcode: yup
    .string()
    .length(5, 'Must be 5 characters long and numeric')
    .matches(/^[0-9]{5}/, 'Post code is not valid')
    .required('Postcode is required'),
  currentPass: yup.string().required('Current password is required'),
  changePass: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  newPass: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})
