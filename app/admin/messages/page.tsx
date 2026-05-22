import { createAdminClient } from "@/lib/supabase/admin";
import { MessagesClient } from "./messages-client";
export default async function AdminMessagesPage() {
  const admin = createAdminClient();
  const { data: messages } = await admin
    .from("messages")
    .select("*, profile:profiles(*)")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">留言管理</h1>
      <MessagesClient messages={messages || []} />
    </div>
  );
}
