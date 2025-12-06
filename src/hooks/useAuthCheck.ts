import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode'; // Used to read the token payload
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

        console.log('Decoded user: ', decodedUser);

        if (decodedUser.exp < currentTime) {
          console.log('Access token expired. Logging out user.');
          localStorage.removeItem('accessToken');
          dispatch(clearUser());
          navigate(ROUTES.login, { replace: true });
        } else {
          console.log('Access token valid. Rehydrating session.');

          dispatch(
            setUser({
              name: decodedUser.name,
              email: decodedUser.email,
              role: decodedUser.role,
            })
          );

          navigate(ROUTES.dashboard, { replace: true });
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
