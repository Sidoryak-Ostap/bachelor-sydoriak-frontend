import { Outlet } from 'react-router';
import { useAuthInit } from '@/hooks/auth/useAuthInit';
import { Suspense, useEffect } from 'react';
import { useAppSelector } from './store/store';
import { useTranslation } from 'react-i18next';

function App() {
  const { language } = useAppSelector(state => state.user.settings);

  const { i18n } = useTranslation();
  useAuthInit();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Outlet />
      </div>
    </Suspense>
  );
}

export default App;
