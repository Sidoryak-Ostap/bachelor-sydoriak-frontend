import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getErrorMessage } from '@/utils/handleApiError';

export const updateProfile = async (formData: FormData) => {
  try {
    const response = await axiosInstance.patch(API_ROUTES.PROFILE.UPDATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
