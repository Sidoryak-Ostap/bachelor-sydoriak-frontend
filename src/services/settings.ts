import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getErrorMessage } from '@/utils/handleApiError';

export type SettingsPayload = {
  language: string;
  timezone: string;
  autoAreaCalculation?: boolean;
  emailUpdates?: boolean;
  weeklySummary?: boolean;
  marketingNews?: boolean;
};

export const updateSettings = async (settings: SettingsPayload) => {
  try {
    const response = await axiosInstance.patch(API_ROUTES.SETTINGS.UPDATE, settings);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
