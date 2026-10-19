import { createClient } from "@supabase/supabase-js";

export interface DynamicQR {
  id: string;
  code: string;
  business_name: string;
  destination_url: string;
  scan_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://yeypvzrzzdcoszkawtxx.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleXB2enJ6emRjb3N6a2F3dHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzODU2MjIsImV4cCI6MjEwNzk2MTYyMn0.9rt4kSjfAORAbip6TJxxYMKagpy2iJgF9rFyz_Jp6pc";

export const isSupabaseConfigured = (): boolean => {
  return true;
};

export const supabase = createClient(supabaseUrl, supabaseKey);
