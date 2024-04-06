import * as yup from 'yup'

export const validationSchema = yup.object({
  changeReport: yup.string().required('Report is required'),
  dateFrom: yup.string().required('Date is required'),
  timeFrom: yup.string().required('Time is required'),
  dateTo: yup.string().required('Date is required'),
  timeTo: yup.string().required('Time is required')
})
