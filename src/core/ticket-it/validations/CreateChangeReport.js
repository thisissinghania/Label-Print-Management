import * as yup from 'yup'

export const validationSchema = yup.object({
  name: yup.string().required('Batch name is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required')
  // notes: yup.string().required('Notes is required')
})
