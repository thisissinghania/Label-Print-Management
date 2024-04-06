import * as yup from 'yup'

export const validationSchema = yup.object({
  filterFieldName: yup.string().required('Field is required'),
  filterFieldValue: yup.string().required('Field is required')
})
