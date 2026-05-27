import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getErrorMessage } from '@/utils/handleApiError';

export type StatisticsData = {
  totalFields: number;
  totalArea: number;
  averageArea: number;
  meanNDVI: number;
  lastIndices: {
    date: string;
    ndvi: {
      mean: number;
      min: number;
      max: number;
    };
  }[];
  cropTypeDistribution: { [cropType: string]: number };
  cropAreaDistribution: { [cropType: string]: number };
};

export const getFieldsStatistics = async (): Promise<StatisticsData> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.STATISTICS.GET);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
