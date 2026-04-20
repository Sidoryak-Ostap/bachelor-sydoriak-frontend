import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateSettings } from '@/services/settings';
import { setSettings } from '@/store/reducers/userSlice';

export const useUpdateSettings = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: data => {
      toast.success('Settings updated successfully');

      dispatch(setSettings(data.settings));
    },
    onError: error => {
      console.error('updateSettings error:', error.message);
      toast.error(error.message);
    },
  });
};
