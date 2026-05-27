import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import type { CreateFieldPayload, Field } from '@/types/field';
import { getErrorMessage } from '@/utils/handleApiError';

export const createField = async (fieldData: CreateFieldPayload) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.FIELDS.CREATE_FIELD, fieldData);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const getFields = async (): Promise<Field[]> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.FIELDS.GET_FIELDS);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const getFieldById = async (fieldId: string): Promise<Field> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.FIELDS.GET_FIELD_BY_ID(fieldId));
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteField = async (fieldId: string) => {
  try {
    const response = await axiosInstance.delete(API_ROUTES.FIELDS.DELETE_FIELD(fieldId));
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

type PredictYieldResponse = {
  success: boolean;
  predicted_yield: number;
  unit: string;
  meta: {
    status: string;
    confidence: number;
    message: string;
  };
};

export const predictYield = async (fieldId: string): Promise<PredictYieldResponse> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.FIELDS.PREDICT_YIELD(fieldId));
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
