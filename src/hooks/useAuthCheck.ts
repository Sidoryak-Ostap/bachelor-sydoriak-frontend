import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { setUser, clearUser, setAuthLoading } from '../store/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/ROUTES';

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        dispatch(setAuthLoading(true));

        const decodedUser: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedUser.exp < currentTime) {
          localStorage.removeItem('accessToken');
          dispatch(clearUser());
          navigate(ROUTES.login, { replace: true });
        } else {
          dispatch(
            setUser({
              name: decodedUser.name,
              email: decodedUser.email,
              role: decodedUser.role,
            })
          );

          // navigate(ROUTES.dashboard.home, { replace: true });
        }
      } catch (error) {
        console.error('Invalid token format during check:', error);
        localStorage.removeItem('accessToken');
        dispatch(clearUser());
      } finally {
        dispatch(setAuthLoading(false));
      }
    }
  }, []);
};
