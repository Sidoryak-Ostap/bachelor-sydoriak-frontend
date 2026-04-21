import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser, logout, setAuthLoading } from '@/store/reducers/userSlice';
import { useAppSelector } from '@/store/store';
import { getMe } from '@/services/auth';
import { setSubscription } from '@/store/reducers/subscriptionSlice';
import { useGetSubscription } from '../subscription/useGetSubscription';

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const token = useAppSelector(state => state.user.token);

  const query = useQuery({
    queryKey: ['auth-me'],
    queryFn: getMe,
    retry: false,
    staleTime: Infinity,
    enabled: !!token,
  });

  const { data, isSuccess, isError } = query;

  const subQuery = useGetSubscription({
    enabled: !!token && isSuccess,
  });

  useEffect(() => {
    if (!token) {
      dispatch(setAuthLoading(false));
      return;
    }

    if (isSuccess && data && subQuery.isSuccess && subQuery.data) {
      dispatch(setUser({ ...data, token }));
      dispatch(setSubscription(subQuery.data));
      dispatch(setAuthLoading(false));
    }

    if (isError) {
      localStorage.removeItem('accessToken');
      dispatch(logout());
      dispatch(setAuthLoading(false));
    }
  }, [isSuccess, isError, data, subQuery.isSuccess, subQuery.data, token, dispatch]);

  return query;
};
