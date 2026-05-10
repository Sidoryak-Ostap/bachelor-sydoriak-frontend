import * as yup from 'yup';

export const profileEditSchema = yup.object({
  firstName: yup.string().optional().default(''),
  lastName: yup.string().optional().default(''),
  bio: yup.string().optional().default(''),
  phoneNumber: yup.string().optional().default(''),
  location: yup.string().optional().default(''),
});
