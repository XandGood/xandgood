"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { adminAction } from "@/lib/admin-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export const createPost = adminAction("createPost", async (formData) => {
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

  if (error || !post) throw error || new Error("创建文章失败");

  if (tagIds.length > 0) {
    const { error: tagError } = await admin.from("post_tags").insert(tagIds.map((tag_id) => ({ post_id: post.id, tag_id })));
    if (tagError) throw tagError;
  }

  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/posts");
});

export const updatePost = adminAction("updatePost", async (formData) => {
  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const tagIds = formData.getAll("tag_ids") as string[];

  const { error } = await admin
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
  if (error) throw error;

  const { data: existingTags } = await admin.from("post_tags").select("tag_id").eq("post_id", id);
  const existingIds = (existingTags || []).map((r) => r.tag_id);
  const existingSet = new Set(existingIds);
  const newSet = new Set(tagIds);

  const toAdd = tagIds.filter((tid) => !existingSet.has(tid));
  const toRemove = existingIds.filter((tid) => !newSet.has(tid));

  if (toAdd.length > 0) {
    const { error: insertError } = await admin.from("post_tags").insert(
      toAdd.map((tag_id) => ({ post_id: id, tag_id }))
    );
    if (insertError) throw insertError;
  }

  if (toRemove.length > 0) {
    const { error: delError } = await admin.from("post_tags").delete().eq("post_id", id).in("tag_id", toRemove);
    if (delError) throw delError;
  }

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath(`/posts/${formData.get("slug")}`);
  redirect("/admin/posts");
});

export const deletePost = adminAction("deletePost", async (formData) => {
  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const { error } = await admin.from("posts").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/posts");
});

export const togglePostStatus = adminAction("togglePostStatus", async (formData) => {
  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const currentStatus = formData.get("current_status") as string;
  const newStatus = currentStatus === "published" ? "draft" : "published";

  const { error } = await admin
    .from("posts")
    .update({
      status: newStatus,
      published_at: newStatus === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
});
