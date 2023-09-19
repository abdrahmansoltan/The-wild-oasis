import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createOrEditCabin } from '../../services/apiCabins';

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries('cabins'); // refetch cabins
    },
    onError: () => {
      toast.error('Something went wrong');
    }
  });

  return { isCreating, createCabin };
};
