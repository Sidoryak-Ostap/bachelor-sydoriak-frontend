import { axiosInstance } from '@/api/axios';
import { API_ROUTES } from '@/constants/API-ROUTES';
import { getErrorMessage } from '@/utils/handleApiError';

type Indice = {
  min: number;
  max: number;
  mean: number;
  stDev: number;
  sampleCount: number;
  noDataCount: number;
};

type FieldIndice = {
  date: string;
  fieldId: string;
  ndvi: Indice;
  evi: Indice;
  ndwi: Indice;
  savi: Indice;
};

type FieldImage = {
  fieldId: string;
  date: string;
  cloudinaryUrl: string;
  indexType: 'NDVI' | 'EVI' | 'NDWI' | 'SAVI';
  bbox: {
    sentinelBbbox: [number, number, number, number];
    mapboxCoords: number[][];
  };
};

export const getFieldIndices = async (fieldId: string): Promise<FieldIndice[]> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.INDICES.GET_INDICES(fieldId));
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const getFieldImages = async (fieldId: string): Promise<FieldImage[]> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.FIELD_IMAGES.GET_FIELD_IMAGES(fieldId));
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
