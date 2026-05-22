"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text.toLowerCase().replace(/[\s]+/g, "-").replace(/[^\w\u4e00-\u9fa5-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const name = formData.get("name") as string;
  await admin.from("categories").insert({ name, slug: slugify(name) });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  await admin.from("categories").update({ name, slug: slugify(name) }).eq("id", id);

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  await admin.from("categories").delete().eq("id", formData.get("id") as string);

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
