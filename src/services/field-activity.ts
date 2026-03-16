import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import type { CreateFieldActivityPayload, FieldActivity } from '@/types/field-activity';
import { getErrorMessage } from '@/utils/handleApiError';

export const createFieldActivity = async (
  payload: CreateFieldActivityPayload
): Promise<FieldActivity> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.FIELD_ACTIVITY.CREATE_ACTIVITY, payload);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const getFieldActivities = async (fieldId: string): Promise<FieldActivity[]> => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.FIELD_ACTIVITY.GET_FIELD_ACTIVITIES(fieldId)
    );
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteFieldActivities = async (activityIds: string[]) => {
  try {
    const response = await axiosInstance.delete(API_ROUTES.FIELD_ACTIVITY.DELETE_ACTIVITY, {
      data: { activityIds },
    });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
