import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { updateSettings } from './settings';

const mockSettings = {
  language: 'en',
  timezone: 'UTC',
  autoAreaCalculation: true,
  emailUpdates: true,
  weeklySummary: false,
  marketingNews: false,
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('updateSettings', () => {
  it('returns updated settings data on success', async () => {
    const responseData = { success: true, settings: mockSettings };
    const patchSpy = vi.spyOn(axiosInstance, 'patch').mockResolvedValue({ data: responseData });

    const result = await updateSettings(mockSettings);

    expect(patchSpy).toHaveBeenCalledWith(API_ROUTES.SETTINGS.UPDATE, mockSettings);
    expect(result).toEqual(responseData);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Settings update failed' } } as any;

    vi.spyOn(axiosInstance, 'patch').mockRejectedValue(axiosError);

    await expect(updateSettings(mockSettings)).rejects.toThrow('Settings update failed');
  });
});
