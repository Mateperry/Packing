import { createClient } from "@supabase/supabase-js";

// Tus credenciales de Supabase
const supabaseUrl = "https://wdyukwekpemmzkcaaple.supabase.co";
const supabaseAnonKey = "sb_publishable_JjQNJ-TKhVPLQTCoWswkUw_lbzoqlQF";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY deben estar definidas en el .env");
}




// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
