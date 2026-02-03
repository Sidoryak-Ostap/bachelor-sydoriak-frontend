import { useState } from 'react';
import { IMG } from '../../assets';
import EnterEmail from '../../components/PasswordRecovery/EnterEmail';
import EnterOTP from '../../components/PasswordRecovery/EnterOTP';
import ResetPassword from '../../components/PasswordRecovery/ResetPassword';
import ResetComplete from '../../components/PasswordRecovery/ResetComplete';

const passwordRecoverySteps = [
  {
    title: 'Reset your password',
    description: 'We’ll send your a 4-digit code.',
  },
  {
    title: 'Enter confirmation code',
    description: 'We sent a code to your email',
  },
  {
    title: 'Create a new password',
    description: 'Must be at least 8 characters',
  },
  {
    title: 'Password reset!',
    description: 'Success! Click to log in magically.',
  },
];

const PasswordRecovery = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <div className="w-full h-screen flex justify-between text-white">
      <div className="h-full w-1/3 bg-gradient-to-br from-[#1A5E52] to-[#36C4AB]">
        <div className="flex flex-col items-start justify-center h-full gap-4 pl-7 pr-2">
          {passwordRecoverySteps.map(({ title, description }, index) => {
            return (
              <div>
                <div className="flex items-start gap-3" key={title}>
                  <img src={IMG.tickImg} alt="tick" className="w-7 h-7" />
                  <div
                    className={`flex flex-col mt-[-5px] ${index === step ? 'text-white' : 'text-[#B7B7B7]'}`}
                  >
                    <p className="font-medium ">{title}</p>
                    <p>{description}</p>
                  </div>
                </div>

                {passwordRecoverySteps.length - 1 !== index && (
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
