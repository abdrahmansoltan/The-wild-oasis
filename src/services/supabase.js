import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nyapmtgvweyechufnrsj.supabase.co';
// No need to hide this key, as RLS policies are in place
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55YXBtdGd2d2V5ZWNodWZucnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2NzI3NjQsImV4cCI6MjAxMDI0ODc2NH0.sQX0_HQMGVxJXRlOUa6ZsRDAAnmqpqHhd2RPLAJtXxs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
