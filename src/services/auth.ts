import axios from 'axios';
import { axiosInstance } from '../api/axios';
import { getErrorMessage } from '@/utils/handleApiError';
import { API_ROUTES } from '@/constants/API-ROUTES';

export interface AuthCredentials {
  email: string;
  password: string;
}

export const authUser = async (authType: 'signup' | 'login', credentials: AuthCredentials) => {
  try {
    const response = await axiosInstance.post(`/auth/${authType}`, credentials);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || 'Server error during signup.';
      throw new Error(serverMessage);
    }

    throw new Error('Network error or request failed.');
  }
};

export const sendResetCode = async (email: string) => {
  try {
    const response = await axiosInstance.post('/auth/send-code', { email });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const verifyResetCode = async (email: string, code: string) => {
  try {
    const response = await axiosInstance.post('/auth/verify-code', { email, code });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await axiosInstance.post('/auth/reset-password', { email, newPassword });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const getMe = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.AUTH.ME);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const logOut = async () => {
  try {
    const response = await axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
