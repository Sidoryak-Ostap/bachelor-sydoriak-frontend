import { getCurrentFieldWeather } from '@/services/weather';
import { useQuery } from '@tanstack/react-query';

export const useGetCurrentFieldWeather = (fieldId: string, language: 'en' | 'uk') => {
  return useQuery({
    queryKey: ['currentFieldWeather', fieldId, language],
    queryFn: () => getCurrentFieldWeather(fieldId, language),
  });
};
