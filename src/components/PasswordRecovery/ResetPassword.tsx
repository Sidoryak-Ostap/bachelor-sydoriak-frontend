import { useForm } from 'react-hook-form';
import { IMG } from '../../assets';
import FormInput from '../FormInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '../../store/store';
import Loader from '../Loader/Loader';
import { useResetPassoword } from '@/hooks/passowrd/useResetPassword';
import { useTranslation } from 'react-i18next';

interface ResetPasswordProps {
  onNext: () => void;
}

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one symbol')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPassword = ({ onNext }: ResetPasswordProps) => {
  const { t } = useTranslation();
  const email = useAppSelector(state => state.resetPassword.email);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useResetPassoword(onNext);

  const onSubmit = (data: ResetPasswordFormData) => {
    mutate({ email: email || '', newPassword: data.newPassword });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center max-w-87.5 w-full mx-auto my-0"
    >
      <div className="px-3.5 py-2.5 rounded-xl bg-[#F4F4F4] mb-4">
        <img src={IMG.moreImg} alt="dots" className="w-8 h-8" />
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-4xl text-black text-center mb-4">
          {t('resetPassword.enterNewPassword.title')}
        </h2>
        <p className="text-[#6C6C6C] text-base text-center">
          {t('resetPassword.enterNewPassword.description')}
        </p>
      </div>

      <div className="w-full flex flex-col gap-3 mb-4">
        <FormInput
          {...register('newPassword')}
          error={errors.newPassword}
          type="password"
          placeholder={t('resetPassword.enterNewPassword.newPasswordPlaceholder')}
        />
        <FormInput
          {...register('confirmPassword')}
          error={errors.confirmPassword}
          type="password"
          placeholder={t('resetPassword.enterNewPassword.confirmPasswordPlaceholder')}
        />
      </div>

      {isPending ? (
        <Loader />
      ) : (
        <button
          className="cursor-pointer font-medium w-full text-center bg-[#1A5E52] py-2.5 px-3 rounded-lg"
          type="submit"
        >
          {t('resetPassword.enterNewPassword.actBtn')}
        </button>
      )}
    </form>
  );
};

export default ResetPassword;
