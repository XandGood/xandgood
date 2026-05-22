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
    .select("*, category:categories(*)", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data: posts, error, count } = await query;

  if (error || !posts) {
    return { posts: [], total: 0 };
  }

  const postsWithTags: Post[] = [];
  for (const post of posts) {
    const { data: ptData } = await supabase
      .from("post_tags")
      .select("tag:tags(*)")
      .eq("post_id", post.id);

    const tags = (ptData || [])
      .map((pt: Record<string, unknown>) => pt.tag as Tag | null)
      .filter((t): t is Tag => t !== null);

    postsWithTags.push({ ...post, tags });
  }

  return { posts: postsWithTags, total: count || 0 };
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) return null;

  const { data: ptData } = await supabase
    .from("post_tags")
    .select("tag:tags(*)")
    .eq("post_id", post.id);

  const tags = (ptData || [])
    .map((pt: Record<string, unknown>) => pt.tag as Tag | null)
    .filter((t): t is Tag => t !== null);

  const { count: likes_count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", post.id);

  let user_liked = false;
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { count: myLike } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post.id)
      .eq("user_id", user.id);
    user_liked = (myLike || 0) > 0;
  }

  return { ...post, tags, likes_count: likes_count || 0, user_liked } as Post;
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").single();
  return data;
}
