import type { JSX } from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../store/store';
import Loader from '../components/Loader/Loader';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(state => state.user);

  if (user.isAuthLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return user.isAuthorized ? children : <Navigate to="/auth/login" />;
};
