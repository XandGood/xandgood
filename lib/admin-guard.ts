import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();

  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData.claims.app_metadata?.is_admin !== true) redirect("/");
  if (claimsData.claims.app_metadata?.is_banned === true) redirect("/auth/login");
}
