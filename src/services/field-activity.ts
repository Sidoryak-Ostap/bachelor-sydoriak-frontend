import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import type { CreateFieldActivityPayload, FieldActivity } from '@/types/field-activity';
import axios from 'axios';

export const createFieldActivity = async (
  payload: CreateFieldActivityPayload
): Promise<FieldActivity> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.FIELD_ACTIVITY.CREATE_ACTIVITY, payload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      const errorMessage = Array.isArray(message)
        ? message.join(', ')
        : message || 'Server error during activity creation.';

      throw new Error(errorMessage);
    }
    throw new Error('Network error or request failed.');
  }
};

export const getFieldActivities = async (fieldId: string): Promise<FieldActivity[]> => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.FIELD_ACTIVITY.GET_FIELD_ACTIVITIES(fieldId)
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      const errorMessage = Array.isArray(message)
        ? message.join(', ')
        : message || 'Server error during fetching field activities.';

      throw new Error(errorMessage);
    }
    throw new Error('Network error or request failed.');
  }
};

export const deleteFieldActivities = async (activityIds: string[]) => {
  try {
    const response = await axiosInstance.delete(API_ROUTES.FIELD_ACTIVITY.DELETE_ACTIVITY, {
      data: { activityIds },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;

      const errorMessage = Array.isArray(serverMessage)
        ? serverMessage.join(', ')
        : serverMessage || 'Server error during deleting field activity.';

      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred.');
  }
};
