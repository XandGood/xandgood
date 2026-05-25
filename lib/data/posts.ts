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

  const [
    { data: post, error },
    { data: { user } },
  ] = await Promise.all([
    supabase
      .from("posts")
      .select("*, category:categories(*), post_tags(tag:tags(*))")
      .eq("slug", slug)
      .eq("status", "published")
      .single(),
    supabase.auth.getUser(),
  ]);

  if (error || !post) return null;

  const raw = post as Record<string, unknown>;
  const tags = ((raw.post_tags as Array<{ tag: Tag }>) || [])
    .map((pt) => pt.tag)
    .filter(Boolean);

  const postId = raw.id as string;

  const [{ count: likesCount }, userLikedResult] = await Promise.all([
    supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId),
    user
      ? supabase
          .from("likes")
          .select("*", { count: "exact", head: true })
          .eq("post_id", postId)
          .eq("user_id", user.id)
      : Promise.resolve(null),
  ]);

  return {
    ...post,
    tags,
    likes_count: likesCount || 0,
    user_liked: userLikedResult ? (userLikedResult.count || 0) > 0 : false,
  } as Post;
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").single();
  return data;
}
