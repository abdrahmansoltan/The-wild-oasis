import supabase, { supabaseUrl } from './supabase';
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); // Get the active session
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser(); // Get the user data from Supabase

  if (error) throw new Error(error.message);
  return data?.user;
}
