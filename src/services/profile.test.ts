import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { updateProfile } from './profile';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('updateProfile', () => {
  it('returns updated profile data on success', async () => {
    const formData = new FormData();
    formData.append('name', 'John Doe');

    const responseData = { id: 'user-1', name: 'John Doe' };
    const patchSpy = vi.spyOn(axiosInstance, 'patch').mockResolvedValue({ data: responseData });

    const result = await updateProfile(formData);

    expect(patchSpy).toHaveBeenCalledWith(API_ROUTES.PROFILE.UPDATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    expect(result).toEqual(responseData);
  });

  it('throws normalized error when request fails', async () => {
    const formData = new FormData();
    formData.append('name', 'John Doe');

    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Profile update failed' } } as any;

    vi.spyOn(axiosInstance, 'patch').mockRejectedValue(axiosError);

    await expect(updateProfile(formData)).rejects.toThrow('Profile update failed');
  });
});
