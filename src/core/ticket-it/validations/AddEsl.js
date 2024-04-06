import * as yup from 'yup'

export const validationSchema = yup.object({
  skuData: yup.string().required('SKU is required')
})
