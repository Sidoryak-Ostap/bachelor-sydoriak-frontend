import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { createField, deleteField, getFieldById, getFields } from './fields';

const mockFieldPayload = {
  name: 'North Plot',
  address: 'Kyiv region',
  owner: 'John Doe',
  area: 12.5,
  cropType: 'Wheat',
  soilType: 'Loam',
  boundary: {
    type: 'Polygon' as const,
    coordinates: [
      [
        [30.5, 50.4],
        [30.6, 50.5],
        [30.7, 50.4],
        [30.5, 50.4],
      ],
    ],
  },
};

const mockField = {
  id: 'field-1',
  userId: 'user-1',
  createdAt: '2026-05-23T00:00:00.000Z',
  previewUrl: 'https://example.com/field-preview.png',
  interpretation: null,
  ...mockFieldPayload,
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('createField', () => {
  it('returns created field data on success', async () => {
    const postSpy = vi.spyOn(axiosInstance, 'post').mockResolvedValue({ data: mockField });

    const result = await createField(mockFieldPayload);

    expect(postSpy).toHaveBeenCalledWith(API_ROUTES.FIELDS.CREATE_FIELD, mockFieldPayload);
    expect(result).toEqual(mockField);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Field creation failed' } } as any;

    vi.spyOn(axiosInstance, 'post').mockRejectedValue(axiosError);

    await expect(createField(mockFieldPayload)).rejects.toThrow('Field creation failed');
  });
});

describe('getFields', () => {
  it('returns fields list on success', async () => {
    const getSpy = vi.spyOn(axiosInstance, 'get').mockResolvedValue({ data: [mockField] });

    const result = await getFields();

    expect(getSpy).toHaveBeenCalledWith(API_ROUTES.FIELDS.GET_FIELDS);
    expect(result).toEqual([mockField]);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Failed to fetch fields' } } as any;

    vi.spyOn(axiosInstance, 'get').mockRejectedValue(axiosError);

    await expect(getFields()).rejects.toThrow('Failed to fetch fields');
  });
});

describe('getFieldById', () => {
  it('returns field details on success', async () => {
    const getSpy = vi.spyOn(axiosInstance, 'get').mockResolvedValue({ data: mockField });

    const result = await getFieldById('field-1');

    expect(getSpy).toHaveBeenCalledWith(API_ROUTES.FIELDS.GET_FIELD_BY_ID('field-1'));
    expect(result).toEqual(mockField);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Field not found' } } as any;

    vi.spyOn(axiosInstance, 'get').mockRejectedValue(axiosError);

    await expect(getFieldById('field-1')).rejects.toThrow('Field not found');
  });
});

describe('deleteField', () => {
  it('returns response data on success', async () => {
    const deleteSpy = vi
      .spyOn(axiosInstance, 'delete')
      .mockResolvedValue({ data: { success: true } });

    const result = await deleteField('field-1');

    expect(deleteSpy).toHaveBeenCalledWith(API_ROUTES.FIELDS.DELETE_FIELD('field-1'));
    expect(result).toEqual({ success: true });
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Failed to delete field' } } as any;

    vi.spyOn(axiosInstance, 'delete').mockRejectedValue(axiosError);

    await expect(deleteField('field-1')).rejects.toThrow('Failed to delete field');
  });
});
