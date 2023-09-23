import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // Filter bookings by status
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

  const {
    isLoading,
    data: bookings,
    error
  } = useQuery({
    queryKey: ['bookings', filter], // depend on filter value to refetch data
    queryFn: () => getBookings({ filter })
  });

  return { isLoading, bookings, error };
}
