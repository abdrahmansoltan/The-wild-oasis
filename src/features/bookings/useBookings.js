import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // Filter bookings by status
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

  // Sort bookings by date
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, sortDirection] = sortByRaw.split('-');
  const sortBy = { field, sortDirection };

  // Pagination
  const page = Number(searchParams.get('page')) || 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page], // depend on filter & sortBy value to refetch data
    queryFn: () => getBookings({ filter, sortBy, page })
  });

  return { isLoading, bookings, count, error };
}
