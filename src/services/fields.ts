import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import type { CreateFieldPayload } from '@/types/field';
import axios from 'axios';

export const createField = async (fieldData: CreateFieldPayload) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.CREATE_FIELD, fieldData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;

      const errorMessage = Array.isArray(message)
        ? message.join(', ')
        : message || 'Server error during field creation.';

      throw new Error(errorMessage);
    }

    throw new Error('Network error or request failed.');
  }
};
