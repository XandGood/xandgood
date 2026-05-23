import { createAdminClient } from "@/lib/supabase/admin";
import { NewPostClient } from "./new-post-client";
import Link from "next/link";
export default async function NewPostPage() {
  const admin = createAdminClient();
  const [{ data: categories }, { data: tags }] = await Promise.all([
    admin.from("categories").select("*").order("name"),
    admin.from("tags").select("*").order("name"),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">新建文章</h1>
        <Link href="/admin/posts" className="text-sm text-white/40 hover:text-white/60">返回列表</Link>
      </div>
      <NewPostClient categories={categories || []} tags={tags || []} />
    </div>
  );
}
