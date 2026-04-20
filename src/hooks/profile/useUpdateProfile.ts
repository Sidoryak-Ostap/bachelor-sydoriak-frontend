import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateProfile } from '@/services/profile';
import { useDispatch } from 'react-redux';
import { setProfile } from '@/store/reducers/userSlice';

export const useUpdateProfile = (onNext?: () => void) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),
    onSuccess: data => {
      onNext && onNext();

      toast.success('Profile updated successfully');
      dispatch(setProfile(data.profile));
    },
    onError: error => {
      console.error('updateProfile error:', error.message);
      toast.error(error.message);
    },
  });
};
