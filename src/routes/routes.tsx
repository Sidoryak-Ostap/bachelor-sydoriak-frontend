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
import ProfileEdit from '@/pages/Dashboard/ProfileEdit/ProfileEdit';
import Fields from '@/pages/Dashboard/Fields';
import Map from '@/pages/Dashboard/Map';
import FieldDetails from '@/pages/Dashboard/FieldDetails';
import MainDashboard from '@/pages/Dashboard/Main';
import { PublicRoute } from './PublicRoute';
import Settings from '@/pages/Dashboard/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      {
        path: 'auth/signup',
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      {
        path: 'auth/login',
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
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
          { index: true, element: <MainDashboard /> },
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

          {
            path: 'profile/edit',
            element: <ProfileEdit />,
          },
          {
            path: 'fields',
            element: <Fields />,
          },
          {
            path: 'fields/:id',
            element: <FieldDetails />,
          },
          {
            path: 'map',
            element: <Map />,
          },
          {
            path: 'map/:id',
            element: <Map />,
          },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
]);
