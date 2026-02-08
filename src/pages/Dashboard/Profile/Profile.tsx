import { IMG } from '@/assets';
import { ROUTES } from '@/constants/ROUTES';
import { Link } from 'react-router';
import { Switch } from '@/components/ui/switch';

const Profile = () => {
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
          <img src={IMG.avatarImg} className="w-18 h-18" alt="Avatar" />

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-xl text-black">Ostap Sydoriak</p>
            <div className="text-gray-400 text-base">Meyer Family Farms · Central Iowa</div>
            <div className="text-gray-400 text-base">Member since 2019 • 4,250 acres managed</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-5 rounded-lg bg-gray-100 w-full">
            <p className="text-gray-400 text-base w-full">Total fields</p>
            <p className="text-black font-medium text-lg w-full">18</p>
          </div>

          <div className="px-4 py-5 rounded-lg bg-gray-100 w-full">
            <p className="text-gray-400 text-base w-full">Crops this season</p>
            <p className="text-black font-medium text-lg w-full">Corn · Soybeans</p>
          </div>

          <div className="px-4 py-5 rounded-lg bg-gray-100 w-full">
            <p className="text-gray-400 text-base w-full">Plan</p>
            <p className="text-black font-medium text-lg w-full">Pro</p>
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
              <p className="text-gray-400 text-base">daniel.meyer@meyerfarms.com</p>
            </div>

            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">Phone</h4>
              <p className="text-gray-400 text-base">+1 (515) 555‑0134</p>
            </div>

            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">Location</h4>
              <p className="text-gray-400 text-base">Boone County, Iowa · United States</p>
            </div>

            <div>
              <h4 className="text-black font-medium text-lg mb-0.5">Farm size</h4>
              <p className="text-gray-400 text-base">4,250 acres · Mixed crops</p>
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
                Pro
              </p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-black font-medium text-lg">AgroMap Pro</h3>
                <p className="text-base text-gray-400">
                  Up to 10,000 acres · Unlimited team members
                </p>
              </div>

              <div className="flex flex-col items-end">
                <h3 className="text-black font-medium text-lg">$29.99</h3>
                <p className="text-base text-gray-400">per month</p>
              </div>
            </div>

            <Link
              to={ROUTES.dashboard.pricing}
              className="w-full bg-gray-100 text-black font-medium py-2 px-4 rounded-lg border border-gray-200 cursor-pointer"
            >
              Manage Plan
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="mb-5">
              <h3 className="text-black font-medium text-lg">Notifications</h3>
              <p className="text-base text-gray-400">Choose how AgroMap keeps you informed</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-black font-medium text-lg">Email updates</h3>
                <p className="text-base text-gray-400">Weekly farm summary</p>
              </div>
              <Switch className="scale-125" />{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
