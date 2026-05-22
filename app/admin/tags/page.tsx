import { createAdminClient } from "@/lib/supabase/admin";
import { TagsClient } from "./tags-client";
export default async function AdminTagsPage() {
  const admin = createAdminClient();
  const { data: tags } = await admin.from("tags").select("*").order("name");

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">标签管理</h1>
      <TagsClient tags={tags || []} />
    </div>
  );
}
