import { IMG } from '@/assets';
import FormInput from '@/components/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { profileEditSchema } from './schema';
import type { ProfileEditForm } from './types';
import { useAppSelector } from '@/store/store';
import { useRef, useState, type ChangeEvent } from 'react';
import { useUpdateProfile } from '@/hooks/profile/useUpdateProfile';
import { ROUTES } from '@/constants/ROUTES';
import Loader from '@/components/Loader';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(user.profile.avatarUrl || null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCurrentAvatar(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const { mutate, isPending } = useUpdateProfile(() => navigate(ROUTES.dashboard.profile));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEditForm>({
    defaultValues: {
      firstName: user.profile.firstName || '',
      lastName: user.profile.lastName || '',
      bio: user.profile.bio || '',
      phoneNumber: user.profile.phoneNumber || '',
      location: user.profile.location || '',
    },
    resolver: yupResolver(profileEditSchema),
  });

  const onSubmit = (data: ProfileEditForm) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key as keyof ProfileEditForm] || '');
    });

    if (selectedFile) {
      formData.append('avatar', selectedFile);
    } else if (currentAvatar && currentAvatar.startsWith('http')) {
      formData.append('avatarUrl', currentAvatar);
    } else {
      formData.append('avatarUrl', 'null');
    }

    mutate(formData);
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
          <div className="group relative w-20 h-20 rounded-full overflow-hidden">
            <img
              src={currentAvatar || IMG.avatarImg}
              className="w-full h-full object-cover"
              alt="Avatar"
            />

            {currentAvatar && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Trash
                  size={24}
                  className="text-red-600 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    setCurrentAvatar(null);
                    setSelectedFile(null);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={triggerFileInput}
              className="text-sm bg-gray-100 text-black font-medium py-2 px-4 rounded-lg border border-gray-200 cursor-pointer"
            >
              Change Avatar
            </button>
            <p className="text-sm text-gray-400">JPG, GIF or PNG. Max size of 5MB</p>
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
                  {...register('phoneNumber')}
                  error={errors.phoneNumber}
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

          {isPending ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="flex items-center justify-end gap-5">
              <button
                disabled={isPending}
                onClick={() => navigate(-1)}
                className="text-black text-base font-medium cursor-pointer"
              >
                Cancel
              </button>

              <button
                disabled={isPending}
                className="bg-primary text-base font-medium text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
