import * as yup from 'yup'

export const assignValidationSchema = yup.object({
  eslBarcode: yup.string().required('ESL Barcode is required')
})
