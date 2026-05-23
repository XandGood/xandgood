"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { adminAction } from "@/lib/admin-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const approveComment = adminAction("approveComment", async (formData) => {
  const admin = createAdminClient();
  const { error } = await admin.from("comments").update({ status: "approved" }).eq("id", formData.get("id") as string);
  if (error) throw error;

  revalidatePath("/admin/comments");
  redirect("/admin/comments");
});

export const rejectComment = adminAction("rejectComment", async (formData) => {
  const admin = createAdminClient();
  const { error } = await admin.from("comments").update({ status: "rejected" }).eq("id", formData.get("id") as string);
  if (error) throw error;

  revalidatePath("/admin/comments");
  redirect("/admin/comments");
});

export const deleteComment = adminAction("deleteComment", async (formData) => {
  const admin = createAdminClient();
  const { error } = await admin.from("comments").delete().eq("id", formData.get("id") as string);
  if (error) throw error;

  revalidatePath("/admin/comments");
  redirect("/admin/comments");
});

export const batchApproveComments = adminAction("batchApproveComments", async (formData) => {
  const admin = createAdminClient();
  const ids = formData.getAll("ids") as string[];
  const { error } = await admin.from("comments").update({ status: "approved" }).in("id", ids);
  if (error) throw error;

  revalidatePath("/admin/comments");
  redirect("/admin/comments");
});

export const batchDeleteComments = adminAction("batchDeleteComments", async (formData) => {
  const admin = createAdminClient();
  const ids = formData.getAll("ids") as string[];
  const { error } = await admin.from("comments").delete().in("id", ids);
  if (error) throw error;

  revalidatePath("/admin/comments");
  redirect("/admin/comments");
});
