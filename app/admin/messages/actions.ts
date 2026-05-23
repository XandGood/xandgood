"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { adminAction } from "@/lib/admin-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteMessage = adminAction("deleteMessage", async (formData) => {
  const admin = createAdminClient();
  const { error } = await admin.from("messages").delete().eq("id", formData.get("id") as string);
  if (error) throw error;

  revalidatePath("/admin/messages");
  revalidatePath("/guestbook");
  redirect("/admin/messages");
});

export const togglePinMessage = adminAction("togglePinMessage", async (formData) => {
  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const isPinned = formData.get("is_pinned") === "true";

  const { error } = await admin.from("messages").update({ is_pinned: !isPinned }).eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/messages");
  revalidatePath("/guestbook");
  redirect("/admin/messages");
});
