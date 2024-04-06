import * as yup from 'yup'

export const validationSchema = yup.object({
  quantity: yup.string().required('Quantity is required')
})
