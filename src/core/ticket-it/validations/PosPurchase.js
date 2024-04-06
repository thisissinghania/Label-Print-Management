import * as yup from 'yup'

export const validationSchema = yup.object({
  // supplierInvoiceNo: yup.string().required('Supplier invoice is required'),
  dateFrom: yup.string().required('Date is required'),
  dateTo: yup.string().required('Date is required')
  // purchaseOrderId: yup.string().required('Purchase order is required')
})
