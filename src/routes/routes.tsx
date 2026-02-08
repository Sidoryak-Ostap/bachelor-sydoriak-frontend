import { createBrowserRouter } from 'react-router';
import App from '../App';
import { PrivateRoute } from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PasswordRecovery from '../pages/PasswordRecovery';
import Main from '../pages/Main';
import Pricing from '@/pages/Dashboard/Pricing';
import FAQ from '@/pages/Dashboard/FAQ';
import Profile from '@/pages/Dashboard/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      {
        path: 'auth/signup',
        element: <SignUp />,
      },
      {
        path: 'auth/login',
        element: <SignIn />,
      },
      {
        path: 'auth/password-recovery',
        element: <PasswordRecovery />,
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'pricing',
            element: <Pricing />,
          },
          {
            path: 'faq',
            element: <FAQ />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
