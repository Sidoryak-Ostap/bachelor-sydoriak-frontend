import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser, logout, setAuthLoading } from '@/store/reducers/userSlice';
import { useAppSelector } from '@/store/store';
import { getMe } from '@/services/auth';

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const token = useAppSelector(state => state.user.token);

  const query = useQuery({
    queryKey: ['auth-me'],
    queryFn: getMe,
    retry: false,
    staleTime: Infinity,
  });

  const { data, isSuccess, isError } = query;

  useEffect(() => {
    if (!token) {
      dispatch(setAuthLoading(false));
      return;
    }

    if (isSuccess && data) {
      console.log(data);

      dispatch(setUser({ ...data, token }));
    }

    if (isError) {
      localStorage.removeItem('accessToken');
      dispatch(logout());
    }
  }, [isSuccess, isError, data]);

  return query;
};
