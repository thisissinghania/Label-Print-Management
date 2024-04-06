import * as yup from 'yup'

export const validationSchema = yup.object({
  Url: yup.string().required('URL is required'),
  UserName: yup.string().required('User is required')
})
