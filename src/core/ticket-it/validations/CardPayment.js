import * as yup from 'yup'

export const validationSchema = yup.object({
  holderName: yup.string().required('Holder name is required'),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, 'Invalid card number')
    .required('Card number is required'),
  cvv: yup
    .string()
    .matches(/^\d{3,4}$/, 'Invalid CVV')
    .required('CVV is required'),
  month: yup.string().required('Month is required'),
  year: yup.string().required('Year is required')
})
