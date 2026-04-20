import { useMutation, useQueryClient } from '@tanstack/react-query'; // 1. Import queryClient
import { authUser, type AuthCredentials } from '../../services/auth';
import { getSubscription } from '../../services/subscription'; // Import the raw service function
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/userSlice';
import { setSubscription } from '@/store/reducers/subscriptionSlice';
import { ROUTES } from '../../constants/ROUTES';

export const useAuth = (authType: 'login' | 'signup') => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: AuthCredentials) => authUser(authType, credentials),
    onSuccess: async data => {
      const { user, accessToken } = data;

      localStorage.setItem('accessToken', accessToken);

      dispatch(
        setUser({
          ...user,
          token: accessToken,
        })
      );

      try {
        const subscriptionData = await queryClient.fetchQuery({
          queryKey: ['subscription'],
          queryFn: getSubscription,
        });

        dispatch(setSubscription(subscriptionData));
      } catch (err) {
        console.error('Failed to fetch subscription after login', err);
      }

      if (authType === 'signup') {
        toast.success('Sign-up successful! Welcome!');
      }

      navigate(ROUTES.dashboard.home, { replace: true });
    },
    onError: (error: any) => {
      toast.error(`${authType} failed: ${error.message}`);
    },
  });
};
