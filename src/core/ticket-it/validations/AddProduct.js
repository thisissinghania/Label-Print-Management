import * as yup from 'yup'

export const validationSchema = yup.object({
  ticketType: yup.string().required('Ticket type is required'),
  eansku: yup.string().required('EAN SKU is required'),
  ticket: yup.string().required('Ticket type is required'),
  promoTitle: yup.string().required('Promo title is required'),
  itemName: yup.string().required('Item name is required'),
  itemDesc: yup.string().required('Item description is required'),
  salePrice: yup.string().required('Sale price is required'),
  ordinaryPrice: yup.string().required('Ordinary price is required'),
  promoEndDate: yup.string().required('Promo end date is required'),
  product1Image: yup.string().required('product1 image is required'),
  cooCountry: yup.string().required('Coo country is required'),
  cooSource: yup.string().required('Coo source is required'),
  ausPerCent: yup.string().required('COO aus per cent is required')
})
