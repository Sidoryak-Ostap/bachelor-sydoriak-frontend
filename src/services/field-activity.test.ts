import { describe, it, expect, vi } from 'vitest';
import { createFieldActivity, getFieldActivities, deleteFieldActivities } from './field-activity';
import { axiosInstance } from '@/api/axios';
import axios from 'axios';

const mockActivity = { id: '1', name: 'Fertilizing', fieldId: 'field-1' };

describe('createFieldActivity', () => {
  it('should return created activity on success', async () => {
    vi.spyOn(axiosInstance, 'post').mockResolvedValue({ data: mockActivity });

    const result = await createFieldActivity({
      fieldId: 'field-1',
      description: 'Fertilizing',
      date: new Date(),
    });

    expect(result).toEqual(mockActivity);
  });

  it('should throw an error when creation fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Validation error' } } as any;
    vi.spyOn(axiosInstance, 'post').mockRejectedValue(axiosError);

    await expect(
      createFieldActivity({ fieldId: 'field-1', description: 'Fertilizing', date: new Date() })
    ).rejects.toThrow('Validation error');
  });
});

describe('getFieldActivities', () => {
  it('should return list of activities on success', async () => {
    vi.spyOn(axiosInstance, 'get').mockResolvedValue({ data: [mockActivity] });

    const result = await getFieldActivities('field-1');

    expect(result).toEqual([mockActivity]);
  });

  it('should throw an error when fetch fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Field not found' } } as any;
    vi.spyOn(axiosInstance, 'get').mockRejectedValue(axiosError);

    await expect(getFieldActivities('field-1')).rejects.toThrow('Field not found');
  });
});

describe('deleteFieldActivities', () => {
  it('should return response data on success', async () => {
    vi.spyOn(axiosInstance, 'delete').mockResolvedValue({ data: { deleted: true } });

    const result = await deleteFieldActivities(['1', '2']);

    expect(result).toEqual({ deleted: true });
  });

  it('should throw an error when deletion fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Activities not found' } } as any;
    vi.spyOn(axiosInstance, 'delete').mockRejectedValue(axiosError);

    await expect(deleteFieldActivities(['1', '2'])).rejects.toThrow('Activities not found');
  });
});
