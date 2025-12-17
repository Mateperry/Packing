// Importamos la función createClient desde el SDK de Supabase
import { createClient } from "@supabase/supabase-js";

// Creamos una instancia de cliente de Supabase que usaremos en toda la app
export const supabase = createClient(
  // URL del proyecto de Supabase, definida en las variables de entorno
  import.meta.env.VITE_SUPABASE_URL!,
  
  // Key anónima de Supabase, también desde las variables de entorno
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);
