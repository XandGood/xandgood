"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteMessage(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  await admin.from("messages").delete().eq("id", formData.get("id") as string);

  revalidatePath("/admin/messages");
  revalidatePath("/guestbook");
  redirect("/admin/messages");
}

export async function togglePinMessage(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const isPinned = formData.get("is_pinned") === "true";

  await admin.from("messages").update({ is_pinned: !isPinned }).eq("id", id);

  revalidatePath("/admin/messages");
  revalidatePath("/guestbook");
  redirect("/admin/messages");
}
