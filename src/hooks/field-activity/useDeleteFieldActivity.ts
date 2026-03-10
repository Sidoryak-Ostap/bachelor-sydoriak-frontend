import { deleteFieldActivities } from '@/services/field-activity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useDeleteFieldActivity = (fieldId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityIds: string[]) => deleteFieldActivities(activityIds),
    onError: error =>
      toast.error(error.message || 'Failed to delete field activity. Please try again.'),
    onSuccess: () => {
      toast.success('Field activity deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['fieldActivities', fieldId] });
    },
  });
};
