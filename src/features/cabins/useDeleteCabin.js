import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: id => deleteCabin(id),
    onSuccess: () => {
      toast.success('Cabin deleted successfully');
      queryClient.invalidateQueries('cabins'); // refetch cabins
    },
    onError: error => toast.error(error.message)
  });

  return { isDeleting, deleteCabin: mutate };
}
