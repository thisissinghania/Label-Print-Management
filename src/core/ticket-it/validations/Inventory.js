import * as yup from 'yup'

export const validationSchema = yup.object({
  selectBrand: yup.string().required('Brand is required'),
  season: yup.string().required('Season is required'),
  supplier: yup.string().required('Supplier is required'),
  colour: yup.string().required('Colour is required')
})
