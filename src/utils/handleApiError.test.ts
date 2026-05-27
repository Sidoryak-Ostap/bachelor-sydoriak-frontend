import { AxiosError, AxiosHeaders } from 'axios';
import { getErrorMessage } from './handleApiError';
import { describe, expect, it, vi } from 'vitest';

describe('getErrorMessage', () => {
  it('should return the server message if an Axios error has a response', () => {
    const mockAxiosError = new AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      {},
      {
        data: { message: 'Custom server error message' },
        status: 400,
        statusText: 'Bad Request',
        headers: new AxiosHeaders(),
        config: { headers: new AxiosHeaders() },
      }
    );

    const result = getErrorMessage(mockAxiosError);
    expect(result).toBe('Custom server error message');
  });

  it('should return fallback server message if response data has no message', () => {
    const mockAxiosError = new AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      {},
      {
        data: {},
        status: 500,
        statusText: 'Internal Server Error',
        headers: new AxiosHeaders(),
        config: { headers: new AxiosHeaders() },
      }
    );

    const result = getErrorMessage(mockAxiosError);
    expect(result).toBe('An error occurred on the server.');
  });

  it('should return network error message if Axios error has a request but no response', () => {
    const mockAxiosError = new AxiosError(
      'Network Error',
      'ERR_NETWORK',
      { headers: new AxiosHeaders() },
      { write: vi.fn() }
    );

    const result = getErrorMessage(mockAxiosError);
    expect(result).toBe('No response from server. Please check your internet connection.');
  });

  // 3. Test Standard JavaScript Errors
  it('should return the message from a standard Error object', () => {
    const genericError = new Error('Something went wrong locally');

    const result = getErrorMessage(genericError);
    expect(result).toBe('Something went wrong locally');
  });

  // 4. Test Fallback (Unknown types)
  it('should return fallback message for completely unexpected errors', () => {
    const resultString = getErrorMessage('String error');
    const resultObj = getErrorMessage({ custom: 'object' });

    expect(resultString).toBe('An unexpected error occurred.');
    expect(resultObj).toBe('An unexpected error occurred.');
  });
});
