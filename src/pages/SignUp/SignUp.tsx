import { NavLink } from 'react-router';
import { IMG } from '../../assets';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signUpSchema from './validation';
import type { SignUpInputs } from './types';
import FormInput from '../../components/FormInput';
import { ROUTES } from '../../constants/ROUTES';
import { useAuth } from '../../hooks/auth/useAuth';
import Loader from '../../components/Loader/Loader';
import GoogleButton from '../../components/GoogleButton';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation();

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
          className="flex flex-col items-center justify-center"
        >
          <h2 className="text-[#1A5E52] max-w-150 text-center text-[40px] font-bold">
            {t('auth.signup.title')}
          </h2>
          <GoogleButton authType="signup" />
          <p className="text-lg text-[#B0B0B0] mt-2 mb-5">{t('auth.signup.google')}</p>
          <div className="flex flex-col justify-center items-center max-w-87.5 w-full gap-2.5 mb-6">
            <FormInput
              {...register('email')}
              error={errors.email}
              type="email"
              placeholder={t('auth.signup.form.email')}
              icon={<img className="w-7 h-7" src={IMG.emailImg} />}
            />

            <FormInput
              {...register('password')}
              error={errors.password}
              type="password"
              placeholder={t('auth.signup.form.password')}
              icon={<img className="w-7 h-7" src={IMG.lockedImg} />}
            />
            <FormInput
              {...register('confirmPassword')}
              error={errors.confirmPassword}
              type="password"
              placeholder={t('auth.signup.form.confirmPassword')}
              icon={<img className="w-7 h-7" src={IMG.lockedImg} />}
            />
          </div>
          {!isPending && (
            <button
              disabled={isPending}
              type="submit"
              className="px-16 py-2 border-2 bg-[#1A5E52] rounded-full cursor-pointer hover:scale-105  transition-transform duration-200 hover:bg-[#1c6a5c]"
            >
              <p className="text-white text-[22px] font-bold">{t('auth.signup.form.actBtn')}</p>
            </button>
          )}
          {isPending && <Loader />}
        </form>
      </div>

      <div className="h-full w-1/3 bg-linear-to-br from-[#1A5E52] to-[#36C4AB]">
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-[38px] text-center font-bold mb-7">{t('auth.signup.other.title')}</h2>
          <p className="text-[20px] text-center max-w-100 mb-25">
            {t('auth.signup.other.description')}
          </p>

          <NavLink
            className="text-white text-[22px] font-bold px-16 py-2 border-2 border-white rounded-full cursor-pointer"
            to={ROUTES.login}
          >
            {t('auth.signup.other.actBtn')}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
