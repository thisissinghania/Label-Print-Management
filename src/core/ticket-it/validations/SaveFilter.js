import * as yup from 'yup'

export const validationSchema = yup.object({
  filterName: yup.string().required('Field is required')
})
