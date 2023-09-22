import supabase from './supabase';

export async function getBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)'
    ); // select all columns from bookings table + data from related foreign tables

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return data;
}

