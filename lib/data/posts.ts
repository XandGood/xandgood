import { createClient } from "@/lib/supabase/server";
import type { Post, Tag } from "@/lib/types";

export async function getPublishedPosts(
  page = 1,
  perPage = 10,
  categoryId?: string,
) {
  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select("*, category:categories(*), post_tags(tag:tags(*))", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data: posts, error, count } = await query;

  if (error || !posts || posts.length === 0) {
    return { posts: [], total: 0 };
  }

  const postsWithTags = posts.map((post: Record<string, unknown>) => ({
    ...post,
    tags: ((post.post_tags as Array<{ tag: Tag }>) || [])
      .map((pt) => pt.tag)
      .filter(Boolean),
  })) as Post[];

  return { posts: postsWithTags, total: count || 0 };
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*, category:categories(*), post_tags(tag:tags(*))")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) return null;

  const raw = post as Record<string, unknown>;
  const tags = ((raw.post_tags as Array<{ tag: Tag }>) || [])
    .map((pt) => pt.tag)
    .filter(Boolean);

  return {
    ...post,
    tags,
    likes_count: 0,
    user_liked: false,
  } as Post;
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").single();
  return data;
}
