"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { adminAction } from "@/lib/admin-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text.toLowerCase().replace(/[\s]+/g, "-").replace(/[^\w\u4e00-\u9fa5-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export const createTag = adminAction("createTag", async (formData) => {
  const admin = createAdminClient();
  const name = formData.get("name") as string;
  const { error } = await admin.from("tags").insert({ name, slug: slugify(name) });
  if (error) throw error;

  revalidatePath("/admin/tags");
  redirect("/admin/tags");
});

export const updateTag = adminAction("updateTag", async (formData) => {
  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const { error } = await admin.from("tags").update({ name, slug: slugify(name) }).eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/tags");
  redirect("/admin/tags");
});

export const deleteTag = adminAction("deleteTag", async (formData) => {
  const admin = createAdminClient();
  const { error } = await admin.from("tags").delete().eq("id", formData.get("id") as string);
  if (error) throw error;

  revalidatePath("/admin/tags");
  redirect("/admin/tags");
});
