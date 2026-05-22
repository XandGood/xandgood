"use client";

import { deleteMessage, togglePinMessage } from "./actions";
import type { Profile } from "@/lib/types";
import { Pin } from "lucide-react";

export function MessagesClient({ messages }: { messages: { id: string; content: string; is_pinned: boolean; created_at: string; profile: Profile | null }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg) => (
        <div key={msg.id} className="glass-liquid p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-sm font-medium">{msg.profile?.display_name || "用户"}</span>
              <span className="text-xs text-white/30">{new Date(msg.created_at).toLocaleDateString("zh-CN")}</span>
              {msg.is_pinned && <Pin className="w-3 h-3 text-purple-400 fill-purple-400" />}
            </div>
            <p className="text-sm text-white/60">{msg.content}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <form action={togglePinMessage}>
              <input type="hidden" name="id" value={msg.id} />
              <input type="hidden" name="is_pinned" value={String(msg.is_pinned)} />
              <button type="submit" className="text-xs text-purple-400 hover:text-purple-300">
                {msg.is_pinned ? "取消置顶" : "置顶"}
              </button>
            </form>
            <form action={deleteMessage}>
              <input type="hidden" name="id" value={msg.id} />
              <button type="submit" className="text-xs text-red-400 hover:text-red-300">删除</button>
            </form>
          </div>
        </div>
      ))}
      {messages.length === 0 && (
        <p className="text-white/30 text-sm">暂无留言</p>
      )}
    </div>
  );
}
