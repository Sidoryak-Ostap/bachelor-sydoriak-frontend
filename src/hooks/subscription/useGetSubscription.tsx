import { getSubscription } from '@/services/subscription';
import { useQuery } from '@tanstack/react-query';

export const useGetSubscription = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscription,
    enabled,
  });
};
