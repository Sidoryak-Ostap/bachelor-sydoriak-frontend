import { renderWithProviders } from '../renderWithProviders';
import SignIn from '@/pages/SignIn';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { store } from '@/store/store';
import { describe, it, expect, vi } from 'vitest';

vi.mock('react-router', async () => await vi.importActual('react-router-dom'));
vi.mock('@/hooks/auth/useAuthInit', () => ({ useAuthInit: vi.fn() }));
vi.mock('@/components/GoogleButton', () => ({ default: () => <div /> }));

describe('SignIn integration', () => {
  it('logs in successfully with correct credentials', async () => {
    const { container } = renderWithProviders(<SignIn />);

    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;
    const submitBtn = container.querySelector('[role="login-btn"]') as HTMLButtonElement;

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitBtn).toBeTruthy();

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(localStorage.getItem('accessToken')).toBe('fake-jwt-token');
      expect(store.getState().user.token).toBe('fake-jwt-token');
      expect(store.getState().user.isAuthorized).toBe(true);
    });
  });
});
