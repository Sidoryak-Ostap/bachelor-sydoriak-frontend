import { getFieldActivities } from '@/services/field-activity';
import { useQuery } from '@tanstack/react-query';

export const useGetFieldActivities = (fieldId: string | null) => {
  return useQuery({
    queryKey: ['fieldActivities', fieldId],
    queryFn: () => {
      if (!fieldId) throw new Error('Field ID is required');
      return getFieldActivities(fieldId);
    },
    enabled: Boolean(fieldId),
  });
};
