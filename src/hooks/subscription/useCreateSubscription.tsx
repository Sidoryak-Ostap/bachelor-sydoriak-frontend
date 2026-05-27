import { createSubscription, getSubscription } from '@/services/subscription';
import { setSubscription } from '@/store/reducers/subscriptionSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['createSubscription'],
    mutationFn: ({
      plan,
      interval,
    }: {
      plan: 'basic' | 'pro' | 'starter';
      interval?: 'monthly' | 'yearly';
    }) => createSubscription(plan, interval),
    onSuccess: async data => {
      window.location.href = data.pageUrl;
      try {
        const subscriptionData = await queryClient.fetchQuery({
          queryKey: ['subscription'],
          queryFn: getSubscription,
        });

        dispatch(setSubscription(subscriptionData));
      } catch (err) {
        console.error('Failed to fetch subscription after login', err);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create subscription');
    },
  });
};
