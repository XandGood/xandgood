import { createAdminClient } from "@/lib/supabase/admin";
import { CommentsClient } from "./comments-client";
export default async function AdminCommentsPage() {
  const admin = createAdminClient();
  const { data: comments, error } = await admin
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !comments) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">评论审核</h1>
        <p className="text-white/40">加载评论失败：{error?.message || "未知错误"}</p>
      </div>
    );
  }

  const userIds = [...new Set(comments.map((c) => c.user_id))];
  const { data: profiles } = await admin
    .from("profiles")
    .select("*")
    .in("id", userIds);

  const profileMap = new Map((profiles || []).map((p) => [p.id, p]));
  const commentsWithProfiles = comments.map((c) => ({
    ...c,
    profile: profileMap.get(c.user_id) || null,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">评论审核</h1>
      <CommentsClient comments={commentsWithProfiles} />
    </div>
  );
}
