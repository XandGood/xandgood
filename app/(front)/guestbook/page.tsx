import { createClient } from "@/lib/supabase/server";
import type { Message, Profile } from "@/lib/types";
import { MessageForm } from "./message-form";
import { Pin } from "lucide-react";

export default async function GuestbookPage() {
  const supabase = await createClient();

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("status", "approved")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  let messagesWithProfiles: (Message & { profile: Profile | null })[] = [];

  if (messages && messages.length > 0) {
    const userIds = [...new Set(messages.map((m) => m.user_id))];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .in("id", userIds);

    const profileMap = new Map((profiles || []).map((p) => [p.id, p]));
    messagesWithProfiles = messages.map((m) => ({
      ...m,
      profile: profileMap.get(m.user_id) || null,
    }));
  }

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-5 pt-32 pb-20">
      <h1 className="text-3xl font-bold text-white mb-8">留言板</h1>

      <MessageForm />

      <div className="flex flex-col gap-4 mt-8">
        {messagesWithProfiles.map((msg) => (
          <div key={msg.id} className="glass-liquid p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-white/80">
                {msg.profile?.display_name || "用户"}
              </span>
              <span className="text-xs text-white/30">
                {new Date(msg.created_at).toLocaleDateString("zh-CN")}
              </span>
              {msg.is_pinned && (
                <Pin className="w-3 h-3 text-purple-400 fill-purple-400" />
              )}
            </div>
            <p className="text-sm text-white/60">{msg.content}</p>
          </div>
        ))}
        {messagesWithProfiles.length === 0 && (
          <p className="text-white/30 text-sm">暂无留言</p>
        )}
      </div>
    </main>
  );
}
