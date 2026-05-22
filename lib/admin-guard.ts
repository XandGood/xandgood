import { createClient } from "@/lib/supabase/server";

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_banned")
    .eq("id", claimsData.claims.sub)
    .single();

  if (profile?.is_banned) return false;

  return claimsData?.claims?.app_metadata?.is_admin === true;
}

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
