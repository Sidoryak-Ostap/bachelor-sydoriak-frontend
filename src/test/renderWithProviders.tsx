// renderWithProviders.tsx
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { store } from '@/store/store';
import i18n from './i18nForTests';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }, // ← don't retry failed queries in tests
  },
});

export const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <MemoryRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
        </QueryClientProvider>
      </Provider>
    </MemoryRouter>
  );
