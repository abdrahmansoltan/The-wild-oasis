import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
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

  // Fetch bookings
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page], // depend on filter & sortBy value to refetch data
    queryFn: () => getBookings({ filter, sortBy, page })
  });

  // Pre-fetching the next page
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    // only pre-fetch if there is a next page
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    });
  }

  // Pre-fetching the previous page
  if (page > 1) {
    // only pre-fetch if there is a previous page
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    });
  }

  return { isLoading, bookings, count, error };
}
