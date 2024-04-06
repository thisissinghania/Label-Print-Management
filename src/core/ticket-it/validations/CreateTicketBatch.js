import * as yup from 'yup'

export const validationSchema = yup.object({
  batchName: yup.string().required('Batch name is required'),
  ticketStartDate: yup.string().required('Start date is required'),
  ticketEndDate: yup.string().required('End date is required')
})
