import { useForm } from 'react-hook-form';
import { IMG } from '../../assets';
import FormInput from '../FormInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { setResetPasswordEmaiil } from '../../store/reducers/resetPasswordSlice';

import Loader from '../Loader/Loader';
import { useSendResetCode } from '@/hooks/passowrd/useSendResetCode';
import { useTranslation } from 'react-i18next';

interface EnterEmailProps {
  onNext: () => void;
}

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
  })
  .required();

const EnterEmail = ({ onNext }: EnterEmailProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useSendResetCode(onNext);

  const onSubmit = (data: { email: string }) => {
    dispatch(setResetPasswordEmaiil(data.email));
    mutate(data.email);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center max-w-93.75 w-full mx-auto my-0"
    >
      <div className="px-3.5 py-2.5 rounded-xl bg-[#F4F4F4] mb-4">
        <img src={IMG.padlockImg} alt="padlock" className="w-8 h-8" />
      </div>

      <div className="mb-10">
        <h2 className="font-bold text-4xl text-black text-center mb-4">
          {t('resetPassword.enterEmail.title')}
        </h2>
        <p className="text-[#6C6C6C] text-base font-semibold text-center">
          {t('resetPassword.enterEmail.description')}
        </p>
      </div>

      <FormInput
        {...register('email')}
        error={errors.email}
        type="email"
        placeholder={t('resetPassword.enterEmail.placeholder')}
      />

      {isPending ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : (
        <button
          className="mt-6 cursor-pointer font-medium w-full text-center bg-[#1A5E52] py-2.5 px-3 rounded-lg"
          type="submit"
        >
          {t('resetPassword.enterEmail.actBtn')}
        </button>
      )}
    </form>
  );
};

export default EnterEmail;
