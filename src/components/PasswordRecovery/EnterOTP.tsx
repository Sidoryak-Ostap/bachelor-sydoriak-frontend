import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IMG } from '../../assets';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '../../store/store';
import Loader from '../Loader/Loader';
import { useVerifyResetCode } from '@/hooks/passowrd/useVerifyResetCode';
import { useSendResetCode } from '@/hooks/passowrd/useSendResetCode';
import { useTranslation } from 'react-i18next';

interface EnterOTPProps {
  onNext: () => void;
}

interface OTPFormData {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
}

const schema = yup.object({
  code1: yup.string().required('Code is required').length(1),
  code2: yup.string().required('Code is required').length(1),
  code3: yup.string().required('Code is required').length(1),
  code4: yup.string().required('Code is required').length(1),
});

const EnterOTP = ({ onNext }: EnterOTPProps) => {
  const { t } = useTranslation();
  const [isResend, setIsResend] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: yupResolver(schema),
  });

  const email = useAppSelector(state => state.resetPassword.email);

  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);

  const codes = watch();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    nextRef?: React.RefObject<HTMLInputElement | null>,
    name?: keyof OTPFormData
  ) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, '');

    if (name) setValue(name, value);

    if (e.target) e.target.value = value;

    if (value.length === 1 && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const getInputClass = (value: string) =>
    `text-center text-6xl text-black h-26 w-22 border-2 rounded-md outline-none ${
      value ? 'border-[#1A5E52]' : 'border-[#B7B7B7] focus:border-[#1A5E52]'
    }`;

  const { mutate, isPending } = useVerifyResetCode(onNext);
  const { mutate: resendCode } = useSendResetCode(undefined, isResend);

  const onSubmit = (data: OTPFormData) => {
    mutate({ code: data.code1 + data.code2 + data.code3 + data.code4, email: email || '' });
  };

  const resendOTP = () => {
    if (email) resendCode(email);
    setIsResend(true);
  };

  return (
    <form
      className="flex flex-col items-center justify-center max-w-93.75 w-full mx-auto my-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="px-3.5 py-2.5 rounded-xl bg-[#F4F4F4] mb-4">
        <img src={IMG.moreImg} alt="dots" className="w-8 h-8" />
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-4xl text-black text-center mb-4">
          {t('resetPassword.enterCode.title')}
        </h2>
        <p className="text-[#6C6C6C] text-base text-center">
          {t('resetPassword.enterCode.description')}
        </p>
      </div>

      <div className="flex justify-between items-center gap-2 mb-2">
        <input
          className={getInputClass(codes.code1)}
          type="text"
          maxLength={1}
          {...register('code1')}
          ref={ref1}
          onChange={e => handleInput(e, ref2, 'code1')}
        />
        <input
          className={getInputClass(codes.code2)}
          type="text"
          maxLength={1}
          {...register('code2')}
          ref={ref2}
          onChange={e => handleInput(e, ref3, 'code2')}
        />
        <input
          className={getInputClass(codes.code3)}
          type="text"
          maxLength={1}
          {...register('code3')}
          ref={ref3}
          onChange={e => handleInput(e, ref4, 'code3')}
        />
        <input
          className={getInputClass(codes.code4)}
          type="text"
          maxLength={1}
          {...register('code4')}
          ref={ref4}
          onChange={e => handleInput(e, undefined, 'code4')}
        />
      </div>

      <p className="text-red-500 text-base mb-4 text-center w-full">
        {errors.code1?.message ||
          errors.code2?.message ||
          errors.code3?.message ||
          errors.code4?.message}
      </p>

      {isPending ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : (
        <button
          className="mb-4 cursor-pointer font-medium w-full text-center bg-[#1A5E52] py-2.5 px-3 rounded-lg"
          type="submit"
        >
          {t('resetPassword.enterCode.actBtn')}
        </button>
      )}

      <p className="text-[#6C6C6C] ">
        {t('resetPassword.enterCode.didntReceive')}{' '}
        <span onClick={resendOTP} className="font-bold text-[#1A5E52] cursor-pointer">
          {t('resetPassword.enterCode.resend')}
        </span>
      </p>
    </form>
  );
};

export default EnterOTP;
