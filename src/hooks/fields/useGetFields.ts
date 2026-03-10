import { getFields } from '@/services/fields';
import { useQuery } from '@tanstack/react-query';

export const useGetFields = () => {
  return useQuery({
    queryKey: ['fields'],
    queryFn: () => getFields(),
  });
};
