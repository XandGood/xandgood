import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_XAG_SUPABASE_URL!,
    process.env.XAG_SUPABASE_SERVICE_ROLE_KEY!,
  );
}
