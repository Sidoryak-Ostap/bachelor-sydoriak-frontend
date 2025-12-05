// import { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

import type { JSX } from 'react';
import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  //   const { user } = useContext(AuthContext);
  const user = null;
  return user ? children : <Navigate to="/login" />;
};
