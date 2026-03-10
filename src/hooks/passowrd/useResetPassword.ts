import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/services/auth';
import { toast } from 'react-toastify';

export const useResetPassoword = (onNext?: () => void) => {
  return useMutation({
    mutationFn: ({ email, newPassword }: { email: string; newPassword: string }) =>
      resetPassword(email, newPassword),
    onSuccess: () => onNext && onNext(),
    onError: error => {
      console.error('resetPassword error:', error.message);
      toast.error(error.message);
    },
  });
};
