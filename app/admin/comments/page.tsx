import { createAdminClient } from "@/lib/supabase/admin";
import { CommentsClient } from "./comments-client";
export default async function AdminCommentsPage() {
  const admin = createAdminClient();
  const { data: comments } = await admin
    .from("comments")
    .select("*, profile:profiles(*)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">评论审核</h1>
      <CommentsClient comments={comments || []} />
    </div>
  );
}
