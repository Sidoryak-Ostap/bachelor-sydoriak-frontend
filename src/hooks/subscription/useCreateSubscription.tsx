import { createSubscription, getSubscription } from '@/services/subscription';
import { setSubscription } from '@/store/reducers/subscriptionSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['createSubscription'],
    mutationFn: (plan: 'basic' | 'pro' | 'starter') => createSubscription(plan),
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
  });
};
