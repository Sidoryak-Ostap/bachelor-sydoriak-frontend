import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getErrorMessage } from '@/utils/handleApiError';

export type FieldReportResponse = {
  status: string;
  stressLevel: string;
  recommendations: string[];
  risks: string[];
  analysis: string;
  generatedAt: Date;
};

export const getFieldReport = async (fieldId: string): Promise<FieldReportResponse> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.FIELD_REPORT.GET(fieldId), {
      language: 'Ukrainian',
    });
    return response.data as FieldReportResponse;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
