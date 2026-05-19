import { NavLink } from 'react-router';
import { IMG } from '../../assets';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signInSchema from './validation';
import type { SignInInputs } from './types';
import FormInput from '../../components/FormInput';
import { ROUTES } from '../../constants/ROUTES';
import { useAuth } from '../../hooks/auth/useAuth';
import Loader from '../../components/Loader/Loader';
import GoogleButton from '../../components/GoogleButton';
import { useAuthInit } from '@/hooks/auth/useAuthInit';
import { useTranslation } from 'react-i18next';

const SignIn = () => {
  const { t, i18n } = useTranslation();

  useAuthInit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: yupResolver(signInSchema),
  });

  const { mutate, isPending } = useAuth('login');

  const onSubmit: SubmitHandler<SignInInputs> = data => {
    const { email, password } = data;

    mutate({ email, password });
  };

  return (
    <div className="w-full h-screen flex justify-between text-white">
      <div className="h-full w-1/3 bg-linear-to-br from-[#1A5E52] to-[#36C4AB]">
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-[38px] max-w-80 text-center font-bold mb-7">
            {t('auth.login.other.title')}
          </h2>
          <p className="text-[20px] text-center max-w-100 mb-25">
            {t('auth.login.other.description')}
          </p>

          <NavLink
            className="text-white text-[22px] font-bold px-16 py-2 border-2 border-white rounded-full cursor-pointer"
            to={ROUTES.signup}
          >
            {t('auth.login.other.actBtn')}
          </NavLink>
        </div>
      </div>

      <div className="bg-white w-2/3 h-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <h2 className="text-[#1A5E52] text-[44px] font-bold">{t('auth.login.title')}</h2>
          <GoogleButton authType="login" />
          <p className="text-lg text-[#B0B0B0] mt-2 mb-5">{t('auth.login.google')}</p>
          <div className="flex flex-col justify-center items-center max-w-87.5 w-full gap-2.5 mb-6">
            <FormInput
              {...register('email')}
              error={errors.email}
              type="email"
              placeholder={t('auth.login.form.email')}
              icon={<img className="w-7 h-7" src={IMG.emailImg} />}
            />

            <FormInput
              {...register('password')}
              error={errors.password}
              type="password"
              placeholder={t('auth.login.form.password')}
              icon={<img className="w-7 h-7" src={IMG.lockedImg} />}
            />
          </div>

          <div className="mb-6">
            <p className="text-black text-[18px]">
              <NavLink to={ROUTES.resetPassword}>{t('auth.login.form.forgotPassword')}</NavLink>
            </p>
            <div className="bg-[#B5CBC7] h-0.5" />
          </div>
          {isPending ? (
            <Loader />
          ) : (
            <button
              disabled={isPending}
              type="submit"
              className="px-16 py-2 border-2 bg-[#1A5E52] rounded-full cursor-pointer hover:scale-105  transition-transform duration-200 hover:bg-[#1c6a5c]"
            >
              <p className="text-white text-[22px] font-bold">{t('auth.login.form.actBtn')}</p>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
