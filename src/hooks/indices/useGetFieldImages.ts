import { getFieldImages } from '@/services/indices';
import { useQuery } from '@tanstack/react-query';

export const useGetFieldImages = (fieldId: string) => {
  return useQuery({
    queryKey: ['fieldImages', fieldId],
    queryFn: () => getFieldImages(fieldId),
  });
};
