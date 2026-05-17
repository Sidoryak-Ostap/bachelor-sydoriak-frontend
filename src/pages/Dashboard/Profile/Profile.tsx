import { IMG } from '@/assets';
import { ROUTES } from '@/constants/ROUTES';
import { Link } from 'react-router';
import { useAppSelector } from '@/store/store';
import { useGetStatistics } from '@/hooks/statistics/useGetStatistics';
import { useMemo } from 'react';
import { formatDate } from '@/utils/format';
import { useCancelSubscription } from '@/hooks/subscription/userCancelSubscription';
import { useTranslation } from 'react-i18next';
import { CROP_TYPES } from '@/constants/fields';
import { SUBSCRIPTION_PLANS } from '@/constants/subscriptionOptions';

interface CropDistItem {
  name: string;
  value: number;
}

const Profile = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const user = useAppSelector(state => state.user);
  const { plan, price, nextPaymentDate, subscriptionId, status } = useAppSelector(
    state => state.subscription
  );

  const isActiveSubscription = plan !== 'starter' && status === 'active';

  const { data: statisticsData, isError } = useGetStatistics();
  const { mutate: cancelSubscription } = useCancelSubscription();

  const handleCancelSubscription = () => {
    cancelSubscription({ subscriptionId, action: 'cancel' });
  };

  const subscriptionAvailableTill = useMemo(() => {
    if (new Date(nextPaymentDate) < new Date()) return null;
    return formatDate(nextPaymentDate);
  }, [nextPaymentDate]);

  const {
    totalFields = 0,
    totalArea = 0,
    cropAreaDistribution = [] as CropDistItem[],
  } = statisticsData || {};

  const crops = useMemo(() => {
    if (!statisticsData || isError) return [];
    const cropNames = (cropAreaDistribution as CropDistItem[]).map(item => item.name);
    return CROP_TYPES.filter(crop => cropNames.includes(crop.value)).map(crop => t(crop.label));
  }, [statisticsData, isError]);

  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.value.toLowerCase() === plan);

  return (
    <div className="pb-10 pt-5 px-5">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-black font-semibold text-xl">{t('dashboard.profile.title')}</h2>
          <p className="text-base text-gray-400">{t('dashboard.profile.description')}</p>
        </div>

        <Link
          to={ROUTES.dashboard.profileEdit}
          className="bg-primary text-white px-4 py-2 rounded-lg text-base font-medium cursor-pointer"
        >
          {t('dashboard.profile.editProfileBtn')}
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-11">
        <div className="flex items-start gap-5 mb-4.5">
          <div className="w-18 h-18 rounded-full overflow-hidden object-cover">
            <img
              src={user.profile.avatarUrl || IMG.avatarImg}
              className="w-full h-full"
              alt="Avatar"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-xl text-black">
              {user.profile.firstName} {user.profile.lastName}
            </p>
            <div className="text-gray-400 text-base">{t('dashboard.profile.memberSince')} 2026</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-5 rounded-lg bg-gray-100 w-full">
            <p className="text-gray-400 text-base w-full">{t('dashboard.profile.totalFields')}</p>
            <p className="text-black font-medium text-lg w-full">{totalFields}</p>
          </div>

          <div className="px-4 py-5 rounded-lg bg-gray-100 w-full">
            <p className="text-gray-400 text-base w-full">
              {t('dashboard.profile.cropsThisSeason')}
            </p>
            <p className="text-black font-medium text-lg w-full">{crops.join(' · ')}</p>
          </div>

          <div className="px-4 py-5 rounded-lg bg-gray-100 w-full">
            <p className="text-gray-400 text-base w-full">{t('dashboard.profile.plan.title')}</p>
            <p className="text-black font-medium text-lg w-full">
              {currentPlan?.label ? t(currentPlan?.label) : t(SUBSCRIPTION_PLANS[0].label)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-5">
        <div className="bg-white border border-gray-200 rounded-lg p-5 w-full">
          <div className="mb-3">
            <h3 className="text-black font-semibold text-lg">
              {t('dashboard.profile.contactDetails.title')}
            </h3>
            <p className="text-base text-gray-400">
              {t('dashboard.profile.contactDetails.description')}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">
                {t('dashboard.profile.contactDetails.email')}
              </h4>
              <p className="text-gray-400 text-base">{user.email}</p>
            </div>

            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">
                {t('dashboard.profile.contactDetails.phone')}
              </h4>
              <p className="text-gray-400 text-base">{user.profile.phoneNumber}</p>
            </div>

            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">
                {t('dashboard.profile.contactDetails.location')}
              </h4>
              <p className="text-gray-400 text-base">{user.profile.location}</p>
            </div>

            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">
                {t('dashboard.profile.contactDetails.farmSize')}
              </h4>
              <p className="text-gray-400 text-base">
                {totalArea} {language === 'en' ? 'ha' : 'га'}{' '}
                {language === 'en' ? ' · Mixed crops' : ' · Змішані культури'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-black font-medium text-lg">
                  {t('dashboard.profile.plan.title')}
                </h3>
                <p className="text-base text-gray-400">{t('dashboard.profile.plan.description')}</p>
              </div>

              <p className="bg-gray-100 text-gray-500 px-4 py-2 font-medium rounded-lg text-base">
                {currentPlan?.label ? t(currentPlan?.label) : t(SUBSCRIPTION_PLANS[0].label)}
              </p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-black font-medium text-lg">
                  AgroMap{' '}
                  {currentPlan?.label ? t(currentPlan?.label) : t(SUBSCRIPTION_PLANS[0].label)}
                </h3>
              </div>

              <div className="flex flex-col items-end">
                <h3 className="text-black font-medium text-lg">
                  $
                  {typeof currentPlan?.price === 'number'
                    ? currentPlan?.price.toFixed(2)
                    : currentPlan?.price}
                </h3>
                <p className="text-base text-gray-400">
                  {language === 'en' ? 'per month' : 'на місяць'}
                </p>
              </div>
            </div>

            {isActiveSubscription && (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-black font-medium text-lg">
                    {t('dashboard.profile.plan.nextPaymentDate')}
                  </h3>
                  <p className="text-base text-gray-400">{formatDate(nextPaymentDate, language)}</p>
                </div>

                <button
                  onClick={handleCancelSubscription}
                  className="mt-5 text-md bg-red-600 rounded-xl px-4 py-3 text-white font-medium self-start cursor-pointer hover:bg-red-700 transition-colors duration-300"
                >
                  {t('dashboard.profile.plan.cancelPlan')}
                </button>
              </div>
            )}

            {!isActiveSubscription && subscriptionAvailableTill && (
              <div>
                <h3 className="text-black font-medium text-lg">
                  {t('dashboard.profile.plan.availableUntil')}
                </h3>
                <p className="text-base text-gray-400">{formatDate(nextPaymentDate, language)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
