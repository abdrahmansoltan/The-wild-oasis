import supabase from './supabase';

export async function getBookings({ filter, sortBy }) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)'
    ); // select all columns from bookings table + data from related foreign tables

  // Add filter to query
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return data;
}

