"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { adminAction } from "@/lib/admin-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export const createCategory = adminAction("createCategory", async (formData) => {
  const admin = createAdminClient();
  const name = formData.get("name") as string;
  const { error } = await admin.from("categories").insert({ name, slug: slugify(name) });
  if (error) throw error;

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
});

export const updateCategory = adminAction("updateCategory", async (formData) => {
  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const { error } = await admin.from("categories").update({ name, slug: slugify(name) }).eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
});

export const deleteCategory = adminAction("deleteCategory", async (formData) => {
  const admin = createAdminClient();
  const { error } = await admin.from("categories").delete().eq("id", formData.get("id") as string);
  if (error) throw error;

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
});
