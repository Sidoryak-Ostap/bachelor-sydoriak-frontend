import { createFieldActivity } from '@/services/field-activity';
import type { CreateFieldActivityPayload } from '@/types/field-activity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useCreateFieldActivity = (fieldId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFieldActivityPayload) => createFieldActivity(data),
    onSuccess: () => {
      toast.success('Field activity created successfully!');
      queryClient.invalidateQueries({ queryKey: ['fieldActivities', fieldId] });
    },
    onError: error =>
      toast.error(error.message || 'Failed to create field activity. Please try again.'),
  });
};
