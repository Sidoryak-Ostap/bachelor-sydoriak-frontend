import { describe, it, expect, vi } from 'vitest';
import { authUser, resetPassword, sendResetCode } from './auth';
import { axiosInstance } from '@/api/axios';
import axios from 'axios';

describe('auth', () => {
  it('should return a token when credentials are correct', async () => {
    vi.spyOn(axiosInstance, 'post').mockResolvedValue({ data: { accessToken: 'abc123' } });

    const user = await authUser('login', { email: 'test@example.com', password: 'password' });

    expect(user).toHaveProperty('accessToken');
  });

  it('should throw an error when credentials are incorrect', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Invalid credentials' } } as any;

    vi.spyOn(axiosInstance, 'post').mockRejectedValue(axiosError);

    await expect(
      authUser('login', { email: 'test@example.com', password: 'wrongpassword' })
    ).rejects.toThrow('Invalid credentials');
  });
});

describe('sendResetCode', () => {
  it('should return success message when email is sent', async () => {
    vi.spyOn(axiosInstance, 'post').mockResolvedValue({ data: { message: 'Code sent' } });
  });

  it('should throw an error when email is not sent', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Email not found' } } as any;
    vi.spyOn(axiosInstance, 'post').mockRejectedValue(axiosError);

    await expect(sendResetCode('testemail@gmail.com')).rejects.toThrow('Email not found');
  });
});

describe('verifyResetCode', () => {
  it('should return success message when code is verified', async () => {
    vi.spyOn(axiosInstance, 'post').mockResolvedValue({
      data: { message: 'Reset code verified successfully' },
    });
  });
});

describe('resetPassword', () => {
  it('should return success message when password is reset', async () => {
    vi.spyOn(axiosInstance, 'post').mockResolvedValue({
      data: { message: 'Password reset successfully' },
    });
  });

  it('should throw an error when code is expired', async () => {
    const axiosError = new axios.AxiosError('Request failed');
    axiosError.response = { data: { message: 'Reset code expired' } } as any;
    vi.spyOn(axiosInstance, 'post').mockRejectedValue(axiosError);

    await expect(resetPassword('testemail@gmail.com', 'newpassword')).rejects.toThrow(
      'Reset code expired'
    );
  });
});

describe('getMe', () => {
  it('should return user data when token is valid', async () => {
    vi.spyOn(axiosInstance, 'get').mockResolvedValue({
      data: { id: 1, email: '', name: 'Test User' },
    });
  });
});

describe('logOut', () => {
  it('should return success message when logout is successful', async () => {
    vi.spyOn(axiosInstance, 'post').mockResolvedValue({ data: { message: 'Logged out' } });
  });
});
