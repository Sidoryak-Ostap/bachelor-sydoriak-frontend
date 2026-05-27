import { predictYield } from '@/services/fields';
import { useQuery } from '@tanstack/react-query';

export const usePredictYield = (fieldId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['predictYield', fieldId],
    queryFn: () => predictYield(fieldId),
    enabled: !!fieldId,
  });

  return { predictYieldData: data, isPredictingYield: isLoading, isPredictYieldError: isError };
};
