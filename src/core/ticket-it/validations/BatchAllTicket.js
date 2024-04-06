import * as yup from 'yup'

export const validationSchema = yup.object({
  ticket: yup.string().required('Ticket type is required')
})
