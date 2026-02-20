import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import type { CreateFieldPayload, Field } from '@/types/field';
import axios from 'axios';

export const createField = async (fieldData: CreateFieldPayload) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.FIELDS.CREATE_FIELD, fieldData);
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

export const getFields = async (): Promise<Field[]> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.FIELDS.GET_FIELDS);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;

      const errorMessage = Array.isArray(message)
        ? message.join(', ')
        : message || 'Server error during field retrieval.';

      throw new Error(errorMessage);
    }

    throw new Error('Network error or request failed.');
  }
};

export const getFieldById = async (fieldId: string): Promise<Field> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.FIELDS.GET_FIELD_BY_ID(fieldId));
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;

      const errorMessage = Array.isArray(message)
        ? message.join(', ')
        : message || 'Server error during field retrieval.';
      throw new Error(errorMessage);
    }

    throw new Error('Network error or request failed.');
  }
};

export const deleteField = async (fieldId: string) => {
  try {
    const response = await axiosInstance.delete(API_ROUTES.FIELDS.DELETE_FIELD(fieldId));
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;

      const errorMessage = Array.isArray(message)
        ? message.join(', ')
        : message || 'Server error during field deletion.';

      throw new Error(errorMessage);
    }

    throw new Error('Network error or request failed.');
  }
};
