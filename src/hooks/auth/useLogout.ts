import { ROUTES } from '@/constants/ROUTES';
import { logOut } from '@/services/auth';
import { logout } from '@/store/reducers/userSlice';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      dispatch(logout());
      navigate(ROUTES.login, { replace: true });
    },
    onError: () => {
      dispatch(logout());
      navigate(ROUTES.login, { replace: true });
    },
  });
};
