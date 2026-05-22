"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  await admin
    .from("site_settings")
    .update({
      blog_name: formData.get("blog_name") as string,
      description: formData.get("description") as string,
      footer: formData.get("footer") as string,
      posts_per_page: parseInt(formData.get("posts_per_page") as string, 10),
    })
    .eq("id", 1);

  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/settings");
}
