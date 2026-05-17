import { IMG } from '@/assets';
import { useCreateSubscription } from '@/hooks/subscription/useCreateSubscription';
import { useCancelSubscription } from '@/hooks/subscription/userCancelSubscription';
import { useAppSelector } from '@/store/store';
import { useState } from 'react';
import { type SubscriptionPlan, SubscriptionPlanName } from '@/constants/subscriptionOptions';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const plansItems = t('main.plans.items', { returnObjects: true }) || [];
  const plansArray = Array.isArray(plansItems) ? plansItems : [];

  const [isAnnual, setIsAnnual] = useState(false);
  const { plan: currentPlan, subscriptionId } = useAppSelector(state => state.subscription);

  const { mutate: cancelSubscription } = useCancelSubscription();
  const { mutate } = useCreateSubscription();

  const handleSubscribe = (plan: 'starter' | 'basic' | 'pro') => {
    if (plan === 'starter') {
      cancelSubscription({ subscriptionId, action: 'cancel' });
      return;
    }

    mutate(plan);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-10">
      <div className="flex flex-col items-center gap-10 mb-11">
        <h1 className="text-primary font-black text-4xl text-center max-w-2xl w-full">
          {language === 'uk'
            ? 'Виберіть найкращий план  для ваших потреб'
            : 'Select The Best Plan For Your Needs'}
        </h1>

        <div className="bg-primary rounded-2xl p-1 relative w-fit">
          <div
            className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-xl transition-transform duration-300 ease-in-out ${
              isAnnual ? 'translate-x-full' : 'translate-x-0'
            }`}
          />

          <div className="flex items-center relative z-10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`cursor-pointer py-2 px-7 rounded-xl font-bold text-base transition-colors duration-300 ${
                !isAnnual ? 'text-primary' : 'text-white'
              }`}
            >
              {language === 'uk' ? 'Щомісячно' : 'Monthly'}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`cursor-pointer py-2 px-7 rounded-xl font-bold text-base transition-colors duration-300 ${
                isAnnual ? 'text-primary' : 'text-white'
              }`}
            >
              {language === 'uk' ? 'Щорічно' : 'Annually'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-stretch justify-center gap-11 ">
        {plansArray.map((plan: SubscriptionPlan) => (
          <div className="bg-white rounded-2xl pt-8 pb-7 px-6 shadow-md flex flex-col max-w-72.5 w-full relative overflow-clip">
            {plan.nameKey === SubscriptionPlanName.Pro && (
              <div
                className="bg-primary h-32 w-full absolute top-0 left-0"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0% 12%)' }}
              />
            )}

            <p className="text-primary text-lg font-semibold">{plan.name}</p>
            <h3 className="text-2xl font-semibold text-primary mb-1">
              {plan.nameKey === SubscriptionPlanName.Starter ? '' : '$'}
              {isAnnual ? plan.pricePerYear : plan.regularPrice}
              {plan.nameKey !== SubscriptionPlanName.Starter && (
                <span className="text-primary text-sm">
                  {isAnnual
                    ? language === 'uk'
                      ? ' /рік'
                      : ' /year'
                    : language === 'uk'
                      ? ' /місяць'
                      : ' /month'}
                </span>
              )}
            </h3>
            <p className="text-gray-400 text-sm pb-2 border-b border-gray-200 mb-4">
              {plan.description}
            </p>

            <ul className="flex flex-col gap-2 mb-17">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
                  <p className="font-medium">{feature}</p>
                </li>
              ))}
            </ul>

            <button
              onClick={() =>
                handleSubscribe(plan.nameKey?.toLowerCase() as 'starter' | 'basic' | 'pro')
              }
              disabled={currentPlan.toLowerCase() === plan?.nameKey?.toLowerCase()}
              className="bg-primary text-white text-center py-2.5 px-8 text-base font-bold rounded-xl mt-auto cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {language === 'uk' ? 'Підписатися' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
