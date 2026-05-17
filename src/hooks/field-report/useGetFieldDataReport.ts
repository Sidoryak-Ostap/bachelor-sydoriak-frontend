import { getFieldReport } from '@/services/field-report';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useGetFieldDataReport = (fieldId: string) => {
  return useMutation({
    mutationFn: async () => getFieldReport(fieldId),
    onError: error => {
      toast.error(error.message || 'Failed to create field activity. Please try again.');
    },
  });
};
