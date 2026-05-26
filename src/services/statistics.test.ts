import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getFieldsStatistics } from './statistics';

const mockStatistics = {
  totalFields: 4,
  totalArea: 120.5,
  averageArea: 30.125,
  cropTypeDistribution: {
    Wheat: 2,
    Corn: 1,
    Barley: 1,
  },
  cropAreaDistribution: {
    Wheat: 70.5,
    Corn: 30,
    Barley: 20,
  },
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('getFieldsStatistics', () => {
  it('returns fields statistics on success', async () => {
    const getSpy = vi.spyOn(axiosInstance, 'get').mockResolvedValue({ data: mockStatistics });

    const result = await getFieldsStatistics();

    expect(getSpy).toHaveBeenCalledWith(API_ROUTES.STATISTICS.GET);
    expect(result).toEqual(mockStatistics);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Failed to load statistics' } } as any;

    vi.spyOn(axiosInstance, 'get').mockRejectedValue(axiosError);

    await expect(getFieldsStatistics()).rejects.toThrow('Failed to load statistics');
  });
});
