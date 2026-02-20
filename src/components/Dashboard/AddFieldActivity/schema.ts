import * as yup from 'yup';

export const addActivitySchema = yup.object().shape({
  description: yup.string().required('Description is required'),
  date: yup.date().required('Date is required').typeError('Invalid date format'),
});
