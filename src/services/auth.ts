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
