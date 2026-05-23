"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { adminAction } from "@/lib/admin-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const toggleBanUser = adminAction("toggleBanUser", async (formData) => {
  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const isBanned = formData.get("is_banned") === "true";

  const { error } = await admin.from("profiles").update({ is_banned: !isBanned }).eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/users");
  redirect("/admin/users");
});
