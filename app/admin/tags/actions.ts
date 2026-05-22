"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text.toLowerCase().replace(/[\s]+/g, "-").replace(/[^\w\u4e00-\u9fa5-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export async function createTag(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const name = formData.get("name") as string;
  await admin.from("tags").insert({ name, slug: slugify(name) });

  revalidatePath("/admin/tags");
  redirect("/admin/tags");
}

export async function updateTag(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  await admin.from("tags").update({ name, slug: slugify(name) }).eq("id", id);

  revalidatePath("/admin/tags");
  redirect("/admin/tags");
}

export async function deleteTag(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  await admin.from("tags").delete().eq("id", formData.get("id") as string);

  revalidatePath("/admin/tags");
  redirect("/admin/tags");
}
