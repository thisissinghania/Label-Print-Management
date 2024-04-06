import * as yup from 'yup'

export const validationSchema = yup.object({
  skuNumber: yup.string().required('EAN SKU is required'),
  itemName: yup.string().required('Item Name is required'),
  salePrice: yup.string().required('Sale Price is required'),
  ordinaryPrice: yup.string().required('Ordinary Price is required'),
  preview: yup.string().required('Preview is required')
})
