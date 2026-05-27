import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { cancelSubscription, createSubscription, getSubscription } from './subscription';

const mockSubscription = {
  subscriptionId: 'sub_123',
  plan: 'pro' as const,
  status: 'active' as const,
  invoiceId: 'inv_001',
  lastAmount: 2999,
  nextPaymentDate: '2026-06-23T00:00:00.000Z',
  price: 2999,
};

const mockCreateSubscriptionResponse = {
  subscriptionId: 'sub_123',
  pageUrl: 'https://checkout.example.com/sub_123',
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('getSubscription', () => {
  it('returns subscription data on success', async () => {
    const getSpy = vi.spyOn(axiosInstance, 'get').mockResolvedValue({ data: mockSubscription });

    const result = await getSubscription();

    expect(getSpy).toHaveBeenCalledWith(API_ROUTES.SUBSCRIPTION.GET);
    expect(result).toEqual(mockSubscription);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Failed to fetch subscription' } } as any;

    vi.spyOn(axiosInstance, 'get').mockRejectedValue(axiosError);

    await expect(getSubscription()).rejects.toThrow('Failed to fetch subscription');
  });
});

describe('createSubscription', () => {
  it('returns checkout data on success', async () => {
    const postSpy = vi
      .spyOn(axiosInstance, 'post')
      .mockResolvedValue({ data: mockCreateSubscriptionResponse });

    const result = await createSubscription('pro');

    expect(postSpy).toHaveBeenCalledWith(API_ROUTES.SUBSCRIPTION.CREATE, { plan: 'pro' });
    expect(result).toEqual(mockCreateSubscriptionResponse);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Subscription creation failed' } } as any;

    vi.spyOn(axiosInstance, 'post').mockRejectedValue(axiosError);

    await expect(createSubscription('pro')).rejects.toThrow('Subscription creation failed');
  });
});

describe('cancelSubscription', () => {
  it('posts cancellation payload and resolves on success', async () => {
    const postSpy = vi.spyOn(axiosInstance, 'post').mockResolvedValue({ data: null });

    const result = await cancelSubscription('sub_123', 'cancel');

    expect(postSpy).toHaveBeenCalledWith(API_ROUTES.SUBSCRIPTION.CANCEL, {
      subscriptionId: 'sub_123',
      action: 'cancel',
    });
    expect(result).toBeUndefined();
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Subscription cancellation failed' } } as any;

    vi.spyOn(axiosInstance, 'post').mockRejectedValue(axiosError);

    await expect(cancelSubscription('sub_123', 'cancel')).rejects.toThrow(
      'Subscription cancellation failed'
    );
  });
});
