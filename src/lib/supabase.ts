import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hhrjoxrdmckvdxhsuwce.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_qH4yArd--J_MscJj1sBlqA_Gft3eNko";

if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn("VITE_SUPABASE_URL is not set. Using fallback development credentials.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
