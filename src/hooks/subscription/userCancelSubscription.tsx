import { cancelSubscription } from '@/services/subscription';
import { setSubscriptionStatus } from '@/store/reducers/subscriptionSlice';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export const useCancelSubscription = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: ['cancelSubscription'],
    mutationFn: ({ subscriptionId, action }: { subscriptionId: string; action: 'cancel' }) =>
      cancelSubscription(subscriptionId, action),
    onSuccess: () => {
      dispatch(setSubscriptionStatus({ status: 'cancelled' }));
      toast.success('Subscription cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to cancel subscription');
    },
  });
};
