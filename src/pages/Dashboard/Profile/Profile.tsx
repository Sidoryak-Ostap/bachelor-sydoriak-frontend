import { IMG } from '@/assets';
import { ROUTES } from '@/constants/ROUTES';
import { Link } from 'react-router';
import { useAppSelector } from '@/store/store';
import { useGetStatistics } from '@/hooks/statistics/useGetStatistics';
import { useMemo } from 'react';
import { formatDate } from '@/utils/format';
import { useCancelSubscription } from '@/hooks/subscription/userCancelSubscription';

interface CropDistItem {
  name: string;
  value: number;
}

const Profile = () => {
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
    return (cropAreaDistribution as CropDistItem[]).map(item => item.name);
  }, [statisticsData, isError]);

  return (
    <div className="pb-10 pt-5 px-5">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-black font-semibold text-xl">Profile</h2>
          <p className="text-base text-gray-400">
            Manage your personal details, farm information, and AgroMap plan in one clean view.
          </p>
        </div>

        <Link
          to={ROUTES.dashboard.profileEdit}
          className="bg-primary text-white px-4 py-2 rounded-lg text-base font-medium cursor-pointer"
        >
          Edit profile
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
            <div className="text-gray-400 text-base">{user.profile.bio}</div>
            <div className="text-gray-400 text-base">Member since 2019 • 4,250 acres managed</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-5 rounded-lg bg-gray-100 w-full">
            <p className="text-gray-400 text-base w-full">Total fields</p>
            <p className="text-black font-medium text-lg w-full">{totalFields}</p>
          </div>

          <div className="px-4 py-5 rounded-lg bg-gray-100 w-full">
            <p className="text-gray-400 text-base w-full">Crops this season</p>
            <p className="text-black font-medium text-lg w-full">{crops.join(' · ')}</p>
          </div>

          <div className="px-4 py-5 rounded-lg bg-gray-100 w-full">
            <p className="text-gray-400 text-base w-full">Plan</p>
            <p className="text-black font-medium text-lg w-full">
              {plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : 'Starter'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-5">
        <div className="bg-white border border-gray-200 rounded-lg p-5 w-full">
          <div className="mb-3">
            <h3 className="text-black font-semibold text-lg">Contact details</h3>
            <p className="text-base text-gray-400">
              Basic information used across your farm reports
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">Email</h4>
              <p className="text-gray-400 text-base">{user.email}</p>
            </div>

            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">Phone</h4>
              <p className="text-gray-400 text-base">{user.profile.phoneNumber}</p>
            </div>

            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">Location</h4>
              <p className="text-gray-400 text-base">{user.profile.location}</p>
            </div>

            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">Farm size</h4>
              <p className="text-gray-400 text-base">{totalArea} ha · Mixed crops</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-black font-medium text-lg">Plan</h3>
                <p className="text-base text-gray-400">Your current AgroMap subscription</p>
              </div>

              <p className="bg-gray-100 text-gray-500 px-4 py-2 font-medium rounded-lg text-base">
                {plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : 'Starter'}
              </p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-black font-medium text-lg">
                  AgroMap {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </h3>
                <p className="text-base text-gray-400">
                  Up to 10,000 acres · Unlimited team members
                </p>
              </div>

              <div className="flex flex-col items-end">
                <h3 className="text-black font-medium text-lg">UAH {price?.toFixed(2) || 0}</h3>
                <p className="text-base text-gray-400">per month</p>
              </div>
            </div>

            {isActiveSubscription && (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-black font-medium text-lg">Next payment date</h3>
                  <p className="text-base text-gray-400">{formatDate(nextPaymentDate)}</p>
                </div>

                <div>
                  <h3 className="text-black font-medium text-lg">Subscription ID</h3>
                  <p className="text-base text-gray-400">{subscriptionId}</p>
                </div>

                <button
                  onClick={handleCancelSubscription}
                  className="mt-5 text-md bg-red-600 rounded-xl px-4 py-3 text-white font-medium self-start cursor-pointer hover:bg-red-700 transition-colors duration-300"
                >
                  Cancel Subscription
                </button>
              </div>
            )}

            {!isActiveSubscription && subscriptionAvailableTill && (
              <div>
                <h3 className="text-black font-medium text-lg">Plan available until</h3>
                <p className="text-base text-gray-400">{formatDate(nextPaymentDate)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
