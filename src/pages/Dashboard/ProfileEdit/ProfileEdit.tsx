import { IMG } from '@/assets';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const ProfileEdit = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-10 pt-5 px-5">
      <div className="flex items-center gap-4 mb-8">
        <button
          className="bg-gray-100 rounded-lg px-2 py-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="text-gray-400" size={22} />
        </button>
        <h2 className="font-semibold text-xl text-black">Edit Profile</h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h3 className="text-black font-semibold text-lg mb-1">Public Profile</h3>
          <p className="text-base text-gray-400">
            This information will be displayed on your public profile.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className="border border-gray-400 rounded-full w-20 h-20 p-0.5">
            <img className="w-full h-full rounded-full" src={IMG.avatarImg} alt="Avatar" />
          </div>

          <div className="flex flex-col gap-2">
            <button className="text-sm bg-gray-100 text-black font-medium py-2 px-4 rounded-lg border border-gray-200 cursor-pointer">
              Change Avatar
            </button>
            <p className="text-sm text-gray-400">JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>

        <form onSubmit={e => e.preventDefault()}>
          <div className="flex items-center gap-20 mb-5">
            <div className="w-full">
              <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                className="border bg-gray-100 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none text-black "
                type="text"
                id="firstName"
                placeholder="Enter your first name"
              />
            </div>

            <div className="w-full">
              <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="border bg-gray-100 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none text-black "
                type="text"
                id="lastName"
                placeholder="Enter your last name"
              />
            </div>

            <div className="w-full">
              <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="role">
                Role
              </label>
              <input
                className="border bg-gray-100 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none text-black "
                type="text"
                id="role"
                placeholder="Enter your role"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              className="border bg-gray-100 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none text-black mb-5"
              placeholder="Write something about you..."
              rows={4}
            />
          </div>

          <div className=" mb-6 pb-10 border-b border-gray-200">
            <div className="mb-8 pb-4 border-b border-gray-200">
              <h3 className="text-black font-semibold text-lg mb-1">Public Profile</h3>
              <p className="text-base text-gray-400">
                This information will be displayed on your public profile.
              </p>
            </div>

            <div className="flex items-center gap-20 ">
              <div className="w-full">
                <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="phone">
                  Phone number
                </label>
                <input
                  className="border bg-gray-100 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none text-black "
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="w-full">
                <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="email">
                  Email address
                </label>
                <input
                  className="border bg-gray-100 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none text-black "
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="w-full">
                <label
                  className="block text-base font-medium text-gray-700 mb-1"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  className="border bg-gray-100 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none text-black "
                  type="text"
                  id="location"
                  placeholder="Enter your location"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-5">
            <button
              onClick={() => navigate(-1)}
              className="text-black text-base font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button className="bg-primary text-base font-medium text-white px-4 py-2 rounded-lg cursor-pointer">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
