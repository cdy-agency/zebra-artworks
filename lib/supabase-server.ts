import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// ENV helpers (NO "@/lib/env")
const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
};

const supabaseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
const anonKey = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
const serviceKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");

const serverClientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

// PUBLIC CLIENT (frontend/server-safe)
export const getSupabaseServerClient = () =>
  createClient(supabaseUrl, anonKey, serverClientOptions);

// SERVICE ROLE CLIENT (admin/seed ONLY)
export const getSupabaseServiceRoleClient = () =>
  createClient(supabaseUrl, serviceKey, serverClientOptions);