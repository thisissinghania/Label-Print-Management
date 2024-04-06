import * as yup from 'yup'

export const validationSchema = yup.object({
  report: yup.string().required('Report is required'),
  fromDate: yup.string().required('Date is required'),
  toDate: yup.string().required('Date is required')
})
