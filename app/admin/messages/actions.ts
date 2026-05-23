"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { adminAction } from "@/lib/admin-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const approveMessage = adminAction("approveMessage", async (formData) => {
  const admin = createAdminClient();
  const { error } = await admin.from("messages").update({ status: "approved" }).eq("id", formData.get("id") as string);
  if (error) throw error;

  revalidatePath("/admin/messages");
  revalidatePath("/guestbook");
  redirect("/admin/messages");
});

export const rejectMessage = adminAction("rejectMessage", async (formData) => {
  const admin = createAdminClient();
  const { error } = await admin.from("messages").update({ status: "rejected" }).eq("id", formData.get("id") as string);
  if (error) throw error;

  revalidatePath("/admin/messages");
  redirect("/admin/messages");
});

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

export const batchApproveMessages = adminAction("batchApproveMessages", async (formData) => {
  const admin = createAdminClient();
  const ids = formData.getAll("ids") as string[];
  const { error } = await admin.from("messages").update({ status: "approved" }).in("id", ids);
  if (error) throw error;

  revalidatePath("/admin/messages");
  revalidatePath("/guestbook");
  redirect("/admin/messages");
});

export const batchDeleteMessages = adminAction("batchDeleteMessages", async (formData) => {
  const admin = createAdminClient();
  const ids = formData.getAll("ids") as string[];
  const { error } = await admin.from("messages").delete().in("id", ids);
  if (error) throw error;

  revalidatePath("/admin/messages");
  revalidatePath("/guestbook");
  redirect("/admin/messages");
});
