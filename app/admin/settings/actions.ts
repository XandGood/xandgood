"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { adminAction } from "@/lib/admin-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateSettings = adminAction("updateSettings", async (formData) => {
  const admin = createAdminClient();
  const { error } = await admin
    .from("site_settings")
    .update({
      blog_name: formData.get("blog_name") as string,
      description: formData.get("description") as string,
      footer: formData.get("footer") as string,
      posts_per_page: parseInt(formData.get("posts_per_page") as string, 10),
    })
    .eq("id", 1);
  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/settings");
});
