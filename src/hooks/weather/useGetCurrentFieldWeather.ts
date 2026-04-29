import { getCurrentFieldWeather } from '@/services/weather';
import { useQuery } from '@tanstack/react-query';

export const useGetCurrentFieldWeather = (fieldId: string) => {
  return useQuery({
    queryKey: ['currentFieldWeather', fieldId],
    queryFn: () => getCurrentFieldWeather(fieldId),
  });
};
