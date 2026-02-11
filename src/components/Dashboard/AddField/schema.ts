import * as yup from 'yup';

export const addFieldSchema = yup.object().shape({
  fieldName: yup.string().required('Field name is required'),
  address: yup.string().required('Address is required'),
  size: yup.string().required('Size is required'),
  cropType: yup.string().required('Crop type is required'),
  soilType: yup.string().required('Soil type is required'),
});
