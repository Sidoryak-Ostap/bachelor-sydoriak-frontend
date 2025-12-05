import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const GoogleLoginButton = () => {
  const handleSuccess = async (response: any) => {
    const id_token = response.credential;
    console.log('Id token: ', id_token);

    try {
      const res = await axios.post('http://localhost:3000/auth/google', { id_token });
      console.log('res: ', res);

      //   alert(`Welcome, ${res.data.user.name}`);
    } catch (err) {
      console.error(err);
      alert('Google login failed');
    }
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={() => alert('Login failed')} />;
};
