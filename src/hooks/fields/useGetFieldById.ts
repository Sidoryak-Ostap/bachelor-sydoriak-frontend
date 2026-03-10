import { getFieldById } from '@/services/fields';
import { useQuery } from '@tanstack/react-query';

export const useGetFieldById = (fieldId: string | null) => {
  return useQuery({
    queryFn: () => {
      if (!fieldId) throw new Error('Field ID is required');
      return getFieldById(fieldId);
    },
    queryKey: ['field', fieldId],
    enabled: Boolean(fieldId),
  });
};
