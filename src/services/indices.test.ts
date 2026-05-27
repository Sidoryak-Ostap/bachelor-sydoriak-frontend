import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getFieldImages, getFieldIndices } from './indices';

const mockIndices = [
  {
    date: '2026-05-20',
    fieldId: 'field-1',
    ndvi: { min: 0.1, max: 0.9, mean: 0.5, stDev: 0.2, sampleCount: 100, noDataCount: 5 },
    evi: { min: 0.05, max: 0.8, mean: 0.4, stDev: 0.15, sampleCount: 100, noDataCount: 5 },
    ndwi: { min: -0.2, max: 0.3, mean: 0.05, stDev: 0.1, sampleCount: 100, noDataCount: 5 },
    savi: { min: 0.08, max: 0.85, mean: 0.45, stDev: 0.17, sampleCount: 100, noDataCount: 5 },
  },
];

const mockImages = [
  {
    fieldId: 'field-1',
    date: '2026-05-20',
    cloudinaryUrl: 'https://example.com/ndvi-image.png',
    indexType: 'NDVI' as const,
    distribution: {
      excellent: 20,
      good: 50,
      moderate: 20,
      poor: 10,
    },
    bbox: {
      sentinelBbbox: [1, 2, 3, 4] as [number, number, number, number],
      mapboxCoords: [
        [30.5, 50.4],
        [30.6, 50.5],
      ],
    },
  },
];

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('getFieldIndices', () => {
  it('returns field indices on success', async () => {
    const getSpy = vi.spyOn(axiosInstance, 'get').mockResolvedValue({ data: mockIndices });

    const result = await getFieldIndices('field-1');

    expect(getSpy).toHaveBeenCalledWith(API_ROUTES.INDICES.GET_INDICES('field-1'));
    expect(result).toEqual(mockIndices);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Failed to fetch indices' } } as any;

    vi.spyOn(axiosInstance, 'get').mockRejectedValue(axiosError);

    await expect(getFieldIndices('field-1')).rejects.toThrow('Failed to fetch indices');
  });
});

describe('getFieldImages', () => {
  it('returns field images on success', async () => {
    const getSpy = vi.spyOn(axiosInstance, 'get').mockResolvedValue({ data: mockImages });

    const result = await getFieldImages('field-1');

    expect(getSpy).toHaveBeenCalledWith(API_ROUTES.FIELD_IMAGES.GET_FIELD_IMAGES('field-1'));
    expect(result).toEqual(mockImages);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Failed to fetch images' } } as any;

    vi.spyOn(axiosInstance, 'get').mockRejectedValue(axiosError);

    await expect(getFieldImages('field-1')).rejects.toThrow('Failed to fetch images');
  });
});
