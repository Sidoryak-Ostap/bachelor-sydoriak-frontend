import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getErrorMessage } from '@/utils/handleApiError';

type CurrentFieldWeather = {
  current: {
    temp: number;
    description: string;
    humidity: number;
    wind_speed: number;
    pressure: number;
    rain?: number;
    icon: string;
    clouds: number;
  };
  daily: [
    {
      dt: number;
      temp: {
        min: number;
        max: number;
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      pressure: number;
      humidity: number;
      wind_speed: number;
      weather: [
        {
          main: string;
          description: string;
          icon: string;
        },
      ];
      clouds: number;
      pop: number;
      rain?: number;
      uvi: number;
    },
  ];
};

export const getCurrentFieldWeather = async (
  fieldId: string,
  language: 'en' | 'uk'
): Promise<CurrentFieldWeather> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.WEATHER.GET_CURRENT_WEATHER(fieldId), {
      params: {
        lang: language,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
