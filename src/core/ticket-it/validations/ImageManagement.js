import * as yup from 'yup'

export const validationSchema = yup.object({
  imageFile: yup.array().min(1, 'At least one file is required')
})
