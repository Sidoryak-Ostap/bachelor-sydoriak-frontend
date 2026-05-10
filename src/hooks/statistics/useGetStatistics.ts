import { getFieldsStatistics } from '@/services/statistics';
import { useQuery } from '@tanstack/react-query';

export const useGetStatistics = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: getFieldsStatistics,
  });
};
