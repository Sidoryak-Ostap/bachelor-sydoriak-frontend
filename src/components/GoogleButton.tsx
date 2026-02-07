import { useGoogleLogin } from '@react-oauth/google';
import { IMG } from '../assets';
import { axiosInstance } from '../api/axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/reducers/userSlice';
import { ROUTES } from '../constants/ROUTES';
import { toast } from 'react-toastify';

const GoogleButton = ({ authType = 'login' }: { authType?: 'login' | 'signup' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const res = await axiosInstance.post(`/auth/google-${authType}`, {
          access_token: tokenResponse.access_token,
        });

        const { user, access_token } = res.data;

        localStorage.setItem('accessToken', access_token);

        dispatch(
          setUser({
            name: user.name,
            email: user.email,
            role: user.role,
          })
        );

        navigate(ROUTES.dashboard.home, { replace: true });
      } catch (error: unknown) {
        console.error(error);
        if (
          typeof error === 'object' &&
          error !== null &&
          'response' in error &&
          typeof (error as any).response === 'object' &&
          (error as any).response !== null
        ) {
          const serverMessage =
            (error as any).response.data?.message || 'Server error during signup.';
          toast.error(`Login failed: ${serverMessage}`);
        }
      }
    },
    onError: () => toast.error('Login failed'),
    flow: 'implicit',
  });

  return (
    <button type="button" onClick={() => login()} className="cursor-pointer">
      <img className="w-14 h-14" src={IMG.googleAuthImg} alt="Google Authentication" />
    </button>
  );
};

export default GoogleButton;
