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
    onSuccess: data => {
      console.log('Field created successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      toast.success('Field created successfully!');
      dispatch(resetFieldCreation());
      navigate(ROUTES.dashboard.fields);
    },
    onError: error => {
      console.error('Field creation error:', error.message);
      toast.error(error.message);
    },
  });
};
