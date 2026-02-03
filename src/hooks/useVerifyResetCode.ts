import { useMutation } from '@tanstack/react-query';
import { verifyResetCode } from '../services/auth';
import { toast } from 'react-toastify';

export const useVerifyResetCode = (onNext?: () => void) => {
  return useMutation({
    mutationFn: ({ code, email }: { code: string; email: string }) => verifyResetCode(email, code),
    onSuccess: () => {
      if (onNext) onNext();
    },
    onError: error => {
      console.error(`verifyResetCode error:`, error.message);
      toast.error(error.message);
    },
  });
};
