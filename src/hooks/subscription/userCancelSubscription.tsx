import { cancelSubscription } from '@/services/subscription';
import { useMutation } from 'node_modules/@tanstack/react-query/build/modern/useMutation';

export const useCancelSubscription = () => {
  return useMutation({
    mutationKey: ['cancelSubscription'],
    mutationFn: ({ subscriptionId, action }: { subscriptionId: string; action: 'cancel' }) =>
      cancelSubscription(subscriptionId, action),
  });
};
