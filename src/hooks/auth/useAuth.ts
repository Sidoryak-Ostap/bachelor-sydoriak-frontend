import { useMutation } from '@tanstack/react-query';
import { authUser, type AuthCredentials } from '../../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/userSlice';
import { ROUTES } from '../../constants/ROUTES';

export const useAuth = (authType: 'login' | 'signup') => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (credentials: AuthCredentials) => authUser(authType, credentials),
    onSuccess: data => {
      const { user, accessToken } = data;

      localStorage.setItem('accessToken', accessToken);

      dispatch(
        setUser({
          name: user.name,
          email: user.email,
          role: user.role,
          token: accessToken,
        })
      );

      authType === 'signup' &&
        toast.success('Sign-up successful! Welcome!', { position: 'top-right' });

      navigate(ROUTES.dashboard.home, { replace: true });
    },
    onError: error => {
      console.error(`${authType} error:`, error.message);
      toast.error(`${authType} failed: ${error.message}`);
    },
  });
};
