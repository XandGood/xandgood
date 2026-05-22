import { createAdminClient } from "@/lib/supabase/admin";
import { EditPostClient } from "./edit-post-client";
import Link from "next/link";
export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const admin = createAdminClient();

  const { data: post } = await admin.from("posts").select("*").eq("id", id).single();
  if (!post) return <p className="text-white/40">文章不存在</p>;

  const { data: categories } = await admin.from("categories").select("*").order("name");
  const { data: tags } = await admin.from("tags").select("*").order("name");
  const { data: postTags } = await admin.from("post_tags").select("tag_id").eq("post_id", id);
  const selectedTagIds = new Set(postTags?.map((pt) => pt.tag_id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">编辑文章</h1>
        <Link href="/admin/posts" className="text-sm text-white/40 hover:text-white/60">返回列表</Link>
      </div>
      <EditPostClient post={post} categories={categories || []} tags={tags || []} selectedTagIds={selectedTagIds} />
    </div>
  );
}
