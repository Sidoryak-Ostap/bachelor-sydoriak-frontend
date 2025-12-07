import { NavLink } from 'react-router';
import { IMG } from '../../assets';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signUpSchema from './validation';
import type { SignUpInputs } from './types';
import FormInput from '../../components/FormInput';
import { ROUTES } from '../../constants/ROUTES';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/Loader/Loader';
import GoogleButton from '../../components/GoogleButton';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: yupResolver(signUpSchema),
  });

  const { mutate, isPending } = useAuth('signup');

  const onSubmit: SubmitHandler<SignUpInputs> = data => {
    const { email, password } = data;

    mutate({ email, password });
  };

  return (
    <div className="w-full h-screen flex justify-between text-white">
      <div className="bg-white w-2/3 h-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center mb-8"
        >
          <h2 className="text-[#1A5E52] text-[44px] font-bold">Create Account</h2>\
          <GoogleButton authType="signup" />
          <p className="text-lg text-[#B0B0B0] mb-8">or use your email for registration:</p>
          <div className="flex flex-col justify-center items-center max-w-[350px] w-full gap-2.5 mb-9">
            <FormInput
              {...register('email')}
              error={errors.email}
              type="email"
              placeholder="Email"
              icon={<img className="w-7 h-7" src={IMG.emailImg} />}
            />

            <FormInput
              {...register('password')}
              error={errors.password}
              type="password"
              placeholder="Password"
              icon={<img className="w-7 h-7" src={IMG.lockedImg} />}
            />
            <FormInput
              {...register('confirmPassword')}
              error={errors.confirmPassword}
              type="password"
              placeholder="Confirm Password"
              icon={<img className="w-7 h-7" src={IMG.lockedImg} />}
            />
          </div>
          <div className="mb-9">
            <p className="text-black text-[18px]">
              <NavLink to="#">Forgot your password?</NavLink>
            </p>
            <div className="bg-[#B5CBC7] h-0.5" />
          </div>
          {!isPending && (
            <button
              disabled={isPending}
              type="submit"
              className="px-16 py-2 border-2 bg-[#1A5E52] rounded-full cursor-pointer hover:scale-105  transition-transform duration-200 hover:bg-[#1c6a5c]"
            >
              <p className="text-white text-[22px] font-bold">Sign Up</p>
            </button>
          )}
          {isPending && <Loader />}
        </form>
      </div>

      <div className="h-full w-1/3 bg-gradient-to-br from-[#1A5E52] to-[#36C4AB]">
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-[38px] font-bold mb-7">Welcome Back!</h2>
          <p className="text-[20px] text-center max-w-[280px] mb-25">
            To keep connected with us please login with your personal info
          </p>

          <NavLink
            className="text-white text-[22px] font-bold px-16 py-2 border-2 border-white rounded-full cursor-pointer"
            to={ROUTES.login}
          >
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
