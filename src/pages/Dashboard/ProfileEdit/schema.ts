import * as yup from 'yup';

export const profileEditSchema = yup.object({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email().required('Required'),
  role: yup.string().required('Required'),
  bio: yup.string().required('Required'),
  phone: yup.string().required('Required'),
  location: yup.string().required('Required'),
});
