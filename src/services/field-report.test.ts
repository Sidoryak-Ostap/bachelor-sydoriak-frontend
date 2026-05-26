import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getFieldReport } from './field-report';

const mockFieldReport = {
  status: 'healthy',
  stressLevel: 'low',
  recommendations: ['Continue current irrigation schedule'],
  risks: ['Possible minor pest activity next week'],
  analysis: 'Vegetation indices show stable crop development.',
  generatedAt: new Date('2026-05-23T10:00:00.000Z'),
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('getFieldReport', () => {
  it('returns field report data on success', async () => {
    const postSpy = vi.spyOn(axiosInstance, 'post').mockResolvedValue({ data: mockFieldReport });

    const result = await getFieldReport('field-1');

    expect(postSpy).toHaveBeenCalledWith(API_ROUTES.FIELD_REPORT.GET('field-1'), {
      language: 'Ukrainian',
    });
    expect(result).toEqual(mockFieldReport);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Failed to get field report' } } as any;

    vi.spyOn(axiosInstance, 'post').mockRejectedValue(axiosError);

    await expect(getFieldReport('field-1')).rejects.toThrow('Failed to get field report');
  });
});
