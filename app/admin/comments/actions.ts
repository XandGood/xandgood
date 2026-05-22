"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function approveComment(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  await admin.from("comments").update({ status: "approved" }).eq("id", formData.get("id") as string);

  revalidatePath("/admin/comments");
  redirect("/admin/comments");
}

export async function rejectComment(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  await admin.from("comments").update({ status: "rejected" }).eq("id", formData.get("id") as string);

  revalidatePath("/admin/comments");
  redirect("/admin/comments");
}

export async function deleteComment(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  await admin.from("comments").delete().eq("id", formData.get("id") as string);

  revalidatePath("/admin/comments");
  redirect("/admin/comments");
}

export async function batchApproveComments(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const ids = formData.getAll("ids") as string[];
  await admin.from("comments").update({ status: "approved" }).in("id", ids);

  revalidatePath("/admin/comments");
  redirect("/admin/comments");
}

export async function batchDeleteComments(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const ids = formData.getAll("ids") as string[];
  await admin.from("comments").delete().in("id", ids);

  revalidatePath("/admin/comments");
  redirect("/admin/comments");
}
