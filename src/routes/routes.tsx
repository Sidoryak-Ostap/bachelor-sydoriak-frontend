import { createBrowserRouter } from 'react-router';
import App from '../App';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import Dashboard from '../pages/Dashboard';
import { PrivateRoute } from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <div>Signup</div>,
  },
  {
    path: '/login',
    element: (
      <div>
        <div>Login</div>
        <GoogleLoginButton />
      </div>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
  },
]);
