import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: {
        'auth.login.form.email': 'Sign In',
        'auth.login.form.password': 'Password',
        'auth.login.form.login-btn': 'Login',
        'auth.login.form.invalid_credentials': 'Invalid credentials',
        'dashboard.main.title': 'Dashboard',
      },
    },

    uk: {
      common: {
        'auth.login.form.email': 'Sign In',
        'auth.login.form.password': 'Password',
        'auth.login.form.login-btn': 'Login',
        'auth.login.form.invalid_credentials': 'Invalid credentials',
        'dashboard.main.title': 'Dashboard',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
