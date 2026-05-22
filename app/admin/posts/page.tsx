import { createAdminClient } from "@/lib/supabase/admin";
import { PostsClient } from "./posts-client";
import Link from "next/link";
export default async function AdminPostsPage() {
  const admin = createAdminClient();
  const { data: posts } = await admin
    .from("posts")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">文章管理</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
        >
          新建文章
        </Link>
      </div>
      <PostsClient posts={posts || []} />
    </div>
  );
}
