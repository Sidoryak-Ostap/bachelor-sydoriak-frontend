import { getFieldIndices } from '@/services/indices';
import { useQuery } from '@tanstack/react-query';

export const useGetFieldIndices = (fieldId: string) => {
  return useQuery({
    queryKey: ['fieldIndices', fieldId],
    queryFn: () => getFieldIndices(fieldId),
  });
};
