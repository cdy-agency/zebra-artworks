import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type Project = {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  client: string;
  description: string;
  images: string[];
  status: "Pending" | "Ongoing" | "Completed";
  date: string;
  created_at: string;
};

export type Profile = {
  id: string;
  full_name: string;
  role: "admin" | "user";
  created_at: string;
};