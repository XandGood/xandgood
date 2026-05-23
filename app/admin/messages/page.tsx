import { createAdminClient } from "@/lib/supabase/admin";
import { MessagesClient } from "./messages-client";
export default async function AdminMessagesPage() {
  const admin = createAdminClient();
  const { data: messages, error } = await admin
    .from("messages")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !messages) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">留言审核</h1>
        <p className="text-white/40">加载留言失败：{error?.message || "未知错误"}</p>
      </div>
    );
  }

  const userIds = [...new Set(messages.map((m) => m.user_id))];
  const { data: profiles } = await admin
    .from("profiles")
    .select("*")
    .in("id", userIds);

  const profileMap = new Map((profiles || []).map((p) => [p.id, p]));
  const messagesWithProfiles = messages.map((m) => ({
    ...m,
    profile: profileMap.get(m.user_id) || null,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">留言审核</h1>
      <MessagesClient messages={messagesWithProfiles} />
    </div>
  );
}
