"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const title = formData.get("title") as string;
  const slug = slugify(title) + "-" + Date.now().toString(36);
  const tagIds = formData.getAll("tag_ids") as string[];

  const { data: post, error } = await admin
    .from("posts")
    .insert({
      title,
      slug,
      content: formData.get("content") as string,
      summary: formData.get("summary") as string,
      category_id: (formData.get("category_id") as string) || null,
      status: formData.get("status") as string,
      published_at: formData.get("status") === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error || !post) redirect("/admin/posts?error=create-failed");

  if (tagIds.length > 0) {
    await admin.from("post_tags").insert(tagIds.map((tag_id) => ({ post_id: post.id, tag_id })));
  }

  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/posts");
}

export async function updatePost(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const tagIds = formData.getAll("tag_ids") as string[];

  await admin
    .from("posts")
    .update({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      summary: formData.get("summary") as string,
      category_id: (formData.get("category_id") as string) || null,
      status,
      published_at: status === "published" ? new Date().toISOString() : undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  await admin.from("post_tags").delete().eq("post_id", id);
  if (tagIds.length > 0) {
    await admin.from("post_tags").insert(tagIds.map((tag_id) => ({ post_id: id, tag_id })));
  }

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath(`/posts/${formData.get("slug")}`);
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/auth/login");
  if (claimsData?.claims?.app_metadata?.is_admin !== true) redirect("/");

  const admin = createAdminClient();
  const id = formData.get("id") as string;
  await admin.from("posts").delete().eq("id", id);

  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/posts");
}
