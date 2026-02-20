import { ROUTES } from '@/constants/ROUTES';
import { createField } from '@/services/fields';
import { resetFieldCreation } from '@/store/reducers/createFieldSlice';
import type { CreateFieldPayload } from '@/types/field';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useCreateField = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (fieldData: CreateFieldPayload) => createField(fieldData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      dispatch(resetFieldCreation());
      toast.success('Field created successfully!');
      setTimeout(() => {
        navigate(ROUTES.dashboard.fields);
      }, 50);
    },
    onError: error => {
      console.error('Field creation error:', error.message);
      toast.error(error.message);
    },
  });
};
