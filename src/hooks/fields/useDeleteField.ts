import { deleteField } from '@/services/fields';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useDeleteField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fieldId: string) => deleteField(fieldId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      toast.success('Field deleted successfully!');
    },
    onError: error => toast.error(error.message || 'Failed to delete field. Please try again.'),
  });
};
