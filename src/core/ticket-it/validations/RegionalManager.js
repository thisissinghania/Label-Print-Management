import * as yup from 'yup'

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validationSchema = yup.object({
  login: yup.string().required('Username is required'),
  email: yup
    .string()
    .required('Email is required')
    .email()
    .matches(/^(?!.*@[^,]*,)/),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup
    .string()
    // .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required'),
  addressLine1: yup.string().required('Address Line 1 is required')
})
