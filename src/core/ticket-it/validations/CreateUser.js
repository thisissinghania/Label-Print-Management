import * as yup from 'yup'

export const validationSchema = yup.object({
  spreadsheet: yup.string().required('Spreadsheet is required'),
  headOffice: yup.string().required('Head Office is required'),
  region: yup.string().required('Region is required'),
  storeOwner: yup.string().required('Store owner group is required')
})
