import { IMG } from '@/assets';
import FormInput from '@/components/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { profileEditSchema } from './schema';
import type { ProfileEditForm } from './types';

const ProfileEdit = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEditForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      bio: '',
      phone: '',
      location: '',
    },
    resolver: yupResolver(profileEditSchema),
  });

  const onSubmit = (data: ProfileEditForm) => {
    console.log(data);
  };

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-20 mb-5">
            <div className="w-full">
              <FormInput
                label="First Name"
                placeholder="Enter your first name"
                {...register('firstName')}
                error={errors.firstName}
              />
            </div>

            <div className="w-full">
              <FormInput
                label="Last Name"
                placeholder="Enter your last name"
                {...register('lastName')}
                error={errors.lastName}
              />
            </div>

            <div className="w-full">
              <FormInput
                label="Role"
                placeholder="Enter your role"
                {...register('role')}
                error={errors.role}
              />
            </div>
          </div>

          <div className="mb-8">
            <FormInput
              label="Bio"
              placeholder="Enter your bio"
              {...register('bio')}
              error={errors.bio}
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
                <FormInput
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  {...register('phone')}
                  error={errors.phone}
                />
              </div>

              <div className="w-full">
                <FormInput
                  label="Email"
                  placeholder="Enter your email"
                  {...register('email')}
                  error={errors.email}
                />
              </div>

              <div className="w-full">
                <FormInput
                  label="Location"
                  placeholder="Enter your location"
                  {...register('location')}
                  error={errors.location}
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
