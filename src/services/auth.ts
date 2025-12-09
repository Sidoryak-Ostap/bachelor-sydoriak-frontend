import { axiosInstance } from '../api/axios';

export interface AuthCredentials {
  email: string;
  password: string;
}

export const authUser = async (authType: 'signup' | 'login', credentials: AuthCredentials) => {
  try {
    const response = await axiosInstance.post(`/auth/${authType}`, credentials);

    return response.data;
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as any).response === 'object' &&
      (error as any).response !== null
    ) {
      const serverMessage = (error as any).response.data?.message || 'Server error during signup.';
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
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as any).response === 'object' &&
      (error as any).response !== null
    ) {
      const serverMessage =
        (error as any).response.data?.message || 'Server error during sending reset code.';
      throw new Error(serverMessage);
    }
    throw new Error('Network error or request failed.');
  }
};

export const verifyResetCode = async (email: string, code: string) => {
  try {
    const response = await axiosInstance.post('/auth/verify-code', { email, code });
    return response.data;
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as any).response === 'object' &&
      (error as any).response !== null
    ) {
      const serverMessage =
        (error as any).response.data?.message || 'Server error during sending reset code.';
      throw new Error(serverMessage);
    }
    throw new Error('Network error or request failed.');
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await axiosInstance.post('/auth/reset-password', { email, newPassword });
    return response.data;
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as any).response === 'object' &&
      (error as any).response !== null
    ) {
      const serverMessage =
        (error as any).response.data?.message || 'Server error during password reset.';
      throw new Error(serverMessage);
    }
    throw new Error('Network error or request failed.');
  }
};
