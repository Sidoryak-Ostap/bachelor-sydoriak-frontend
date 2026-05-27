import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getErrorMessage } from '@/utils/handleApiError';

type Subscription = {
  subscriptionId: string;
  plan: 'basic' | 'pro' | 'starter';
  status: 'active' | 'canceled' | 'past_due' | 'expired';
  invoiceId: string;
  lastAmount: number;
  nextPaymentDate: string;
  price: number;
};

type CreateSubscriptionResponse = {
  subscriptionId: string;
  pageUrl: string;
};

export const getSubscription = async (): Promise<Subscription> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.SUBSCRIPTION.GET);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const createSubscription = async (
  plan: 'basic' | 'pro' | 'starter',
  interval?: 'monthly' | 'yearly'
): Promise<CreateSubscriptionResponse> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.SUBSCRIPTION.CREATE, { plan, interval });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const cancelSubscription = async (
  subscriptionId: string,
  action: 'cancel'
): Promise<void> => {
  try {
    await axiosInstance.post(API_ROUTES.SUBSCRIPTION.CANCEL, { subscriptionId, action });
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
