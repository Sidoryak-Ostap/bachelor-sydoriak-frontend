import { useState } from 'react';
import { IMG } from '../../assets';
import EnterEmail from '../../components/PasswordRecovery/EnterEmail';
import EnterOTP from '../../components/PasswordRecovery/EnterOTP';
import ResetPassword from '../../components/PasswordRecovery/ResetPassword';
import ResetComplete from '../../components/PasswordRecovery/ResetComplete';
import { useTranslation } from 'react-i18next';

const PasswordRecovery = () => {
  const [step, setStep] = useState<number>(0);

  const { t } = useTranslation();

  const resetPasswordSteps =
    t('resetPassword.steps', {
      returnObjects: true,
    }) || [];

  const stepsArray = Array.isArray(resetPasswordSteps) ? resetPasswordSteps : [];

  return (
    <div className="w-full h-screen flex justify-between text-white">
      <div className="h-full w-1/3 bg-linear-to-br from-[#1A5E52] to-[#36C4AB]">
        <div className="flex flex-col items-start justify-center h-full gap-4 pl-7 pr-2">
          {stepsArray.map(({ title, description }, index) => {
            return (
              <div>
                <div className="flex items-start gap-3" key={title}>
                  <img src={IMG.tickImg} alt="tick" className="w-7 h-7" />
                  <div
                    className={`flex flex-col -mt-1.25 ${index === step ? 'text-white' : 'text-[#B7B7B7]'}`}
                  >
                    <p className="font-semibold ">{title}</p>
                    <p>{description}</p>
                  </div>
                </div>

                {stepsArray.length - 1 !== index && (
                  <img src={IMG.dividerImg} alt="divider" className="w-1 ml-3" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white w-2/3 h-full flex flex-col items-center justify-center">
        {step === 0 && <EnterEmail onNext={() => setStep(1)} />}
        {step === 1 && <EnterOTP onNext={() => setStep(2)} />}
        {step === 2 && <ResetPassword onNext={() => setStep(3)} />}
        {step === 3 && <ResetComplete />}
      </div>
    </div>
  );
};

export default PasswordRecovery;
