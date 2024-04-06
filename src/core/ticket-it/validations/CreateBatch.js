import * as yup from 'yup'

export const validationSchema = yup.object({
  name: yup.string().required('Batch name is required'),
  dateFrom: yup.string().required('Start date is required'),
  dateTo: yup.string().required('End date is required'),
  // notes: yup.string().required('Notes is required'),
  SpreadsheetFile: yup.string().required('File is required')
})
