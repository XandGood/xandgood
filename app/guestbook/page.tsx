import { createClient } from "@/lib/supabase/server";
import type { Message, Profile } from "@/lib/types";
import { Nav } from "@/components/nav";
import { MessageForm } from "./message-form";
import { Pin } from "lucide-react";

import { unstable_noStore as noStore } from "next/cache";

export default async function GuestbookPage() {
  noStore();
  const supabase = await createClient();

  const { data: messages } = await supabase
    .from("messages")
    .select("*, profile:profiles(*)")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen flex flex-col dark text-foreground">
      <div className="fixed inset-0 -z-10 pointer-events-none bg-background">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      <Nav />

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 pt-32 pb-20">
        <h1 className="text-3xl font-bold text-white mb-8">留言板</h1>

        <MessageForm />

        <div className="flex flex-col gap-4 mt-8">
          {(messages as (Message & { profile: Profile })[])?.map((msg) => (
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
          {(!messages || messages.length === 0) && (
            <p className="text-white/30 text-sm">暂无留言</p>
          )}
        </div>
      </main>

      <footer className="border-t border-white/5 mt-auto relative z-10 glass-liquid rounded-b-none rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-20 px-5 text-xs text-white/40">
          <p>© 2026 Xandgood. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
