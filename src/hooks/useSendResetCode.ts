import { useMutation } from '@tanstack/react-query';
import { sendResetCode } from '../services/auth';
import { toast } from 'react-toastify';

export const useSendResetCode = (onNext?: () => void, isResend?: boolean) => {
  return useMutation({
    mutationFn: (email: string) => sendResetCode(email),
    onSuccess: () => {
      isResend && toast.success('Reset code resent successfully!');
      if (onNext) onNext();
    },
    onError: error => {
      console.error(`sendResetCode error:`, error.message);
      toast.error(error.message);
    },
  });
};
