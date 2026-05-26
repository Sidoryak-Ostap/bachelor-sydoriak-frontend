import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getCurrentFieldWeather } from './weather';

const mockWeatherResponse = {
  current: {
    temp: 23,
    description: 'clear sky',
    humidity: 54,
    wind_speed: 3.8,
    pressure: 1015,
    rain: 0.2,
    icon: '01d',
    clouds: 12,
  },
  daily: [
    {
      dt: 1716422400,
      temp: {
        min: 16,
        max: 25,
        day: 23,
        night: 17,
        eve: 21,
        morn: 18,
      },
      pressure: 1014,
      humidity: 56,
      wind_speed: 4.2,
      weather: [
        {
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: 10,
      pop: 0.1,
      rain: 0,
      uvi: 6.2,
    },
  ],
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('getCurrentFieldWeather', () => {
  it('returns weather data on success', async () => {
    const getSpy = vi.spyOn(axiosInstance, 'get').mockResolvedValue({ data: mockWeatherResponse });

    const result = await getCurrentFieldWeather('field-1', 'en');

    expect(getSpy).toHaveBeenCalledWith(API_ROUTES.WEATHER.GET_CURRENT_WEATHER('field-1'), {
      params: {
        lang: 'en',
      },
    });
    expect(result).toEqual(mockWeatherResponse);
  });

  it('throws normalized error when request fails', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Failed to fetch weather data' } } as any;

    vi.spyOn(axiosInstance, 'get').mockRejectedValue(axiosError);

    await expect(getCurrentFieldWeather('field-1', 'uk')).rejects.toThrow(
      'Failed to fetch weather data'
    );
  });
});
