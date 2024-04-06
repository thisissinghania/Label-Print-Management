import * as yup from 'yup'

export const validationSchema = yup.object({
  reason: yup.string().required('Reason is required')
})
