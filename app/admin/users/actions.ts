"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleBanUser(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const isBanned = formData.get("is_banned") === "true";

  await admin.from("profiles").update({ is_banned: !isBanned }).eq("id", id);

  revalidatePath("/admin/users");
  redirect("/admin/users");
}
