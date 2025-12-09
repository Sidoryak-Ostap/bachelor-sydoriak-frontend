import { createBrowserRouter } from 'react-router';
import App from '../App';
import { PrivateRoute } from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { PasswordRecovery } from '../pages/PasswordRecovery/PasswordRecovery';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
      },
    ],
  },
]);
