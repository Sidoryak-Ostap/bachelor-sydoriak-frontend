import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { clearUser, setAuthLoading, setUser } from '@/store/reducers/userSlice';
import { ROUTES } from '@/constants/ROUTES';
import { axiosInstance } from '@/api/axios';
// Import your API call for refreshing
// import { refreshAccessToken } from '@/api/auth';

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        dispatch(setAuthLoading(false));
        return;
      }

      try {
        dispatch(setAuthLoading(true));
        const decodedUser: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedUser.exp < currentTime) {
          // --- NEW REFRESH LOGIC ---
          try {
            // Attempt to get a new access token
            // This usually sends the refresh token from cookies automatically
            const res = await axiosInstance.post('/auth/refresh');
            const newAccessToken = res.data.access_token;
            // Assuming your response returns the new user data or token
            const newDecoded: any = jwtDecode(newAccessToken);
            localStorage.setItem('accessToken', newAccessToken);

            dispatch(
              setUser({
                name: newDecoded.name,
                email: newDecoded.email,
                role: newDecoded.role,
              })
            );
          } catch (refreshError) {
            // Refresh failed (refresh token expired or invalid)
            localStorage.removeItem('accessToken');
            dispatch(clearUser());
            navigate(ROUTES.login, { replace: true });
          }
        } else {
          // Token still valid
          dispatch(
            setUser({
              name: decodedUser.name,
              email: decodedUser.email,
              role: decodedUser.role,
            })
          );
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('accessToken');
        dispatch(clearUser());
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    checkAuth();
  }, [dispatch, navigate]);
};
