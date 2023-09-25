import { PAGE_SIZE } from '../utils/constants';
import supabase from './supabase';

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase.from('bookings').select(
    'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
    { count: 'exact' } // get the total count of rows
  ); // select all columns from bookings table + data from related foreign tables

  // Add filter to query
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);
  // Add sort to query
  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.sortDirection === 'asc' });
  // Add pagination to query
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}
