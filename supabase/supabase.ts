import { createClient } from '@supabase/supabase-js';
import { SUPABASE_API_KEY, SUPABASE_PROJECT_URL } from '../constants/constants';

export const supabase = createClient(
  SUPABASE_PROJECT_URL as string, 
  SUPABASE_API_KEY as string
);

