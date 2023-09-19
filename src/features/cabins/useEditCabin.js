import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createOrEditCabin } from '../../services/apiCabins';

export const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createOrEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin edited successfully');
      queryClient.invalidateQueries('cabins'); // refetch cabins
    },
    onError: () => {
      toast.error('Something went wrong');
    }
  });

  return { isEditing, editCabin };
};
