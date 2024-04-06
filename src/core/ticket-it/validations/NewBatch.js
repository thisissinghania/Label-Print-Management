import * as yup from 'yup'

export const validationSchema = yup.object({
  regionNames: yup
    .array()
    .test(
      'regionOrClientLoginRequired',
      'At least one region or user is required',
      function (value) {
        return value?.length > 0 || this.parent.clientLoginNames?.length > 0
      }
    ),

  clientLoginNames: yup
    .array()
    .test(
      'regionOrClientLoginRequired',
      'At least one region or user is required',
      function (value) {
        return value?.length > 0 || this.parent.regionNames?.length > 0
      }
    ),

  // tagsList: yup.array().min(1, 'At least one tag is required'),
  // categoryList: yup.array().min(1, 'At least one category is required'),
  subject: yup.string().required('Subject is required'),
  publishDate: yup.string().required('Publish date is required'),
  body: yup.string().required('Message is required')
})
