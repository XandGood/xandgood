"use client";

import { approveMessage, rejectMessage, deleteMessage, togglePinMessage, batchApproveMessages, batchDeleteMessages } from "./actions";
import type { Profile } from "@/lib/types";
import { Pin } from "lucide-react";

export function MessagesClient({ messages }: { messages: { id: string; user_id: string; content: string; is_pinned: boolean; status: string; created_at: string; profile: Profile | null }[] }) {
  const pending = messages.filter((m) => m.status === "pending");
  const others = messages.filter((m) => m.status !== "pending");

  return (
    <div>
      {pending.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">待审核 ({pending.length})</h2>
            <div className="flex gap-2">
              <form action={batchApproveMessages}>
                {pending.map((m) => (
                  <input key={m.id} type="hidden" name="ids" value={m.id} />
                ))}
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-green-600/20 text-green-400 text-xs hover:bg-green-600/30 transition-colors">
                  全部批准
                </button>
              </form>
              <form action={batchDeleteMessages}>
                {pending.map((m) => (
                  <input key={m.id} type="hidden" name="ids" value={m.id} />
                ))}
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 text-xs hover:bg-red-600/30 transition-colors">
                  全部删除
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {pending.map((m) => (
              <div key={m.id} className="glass-liquid p-5">
                <div className="flex items-center gap-3 mb-2 text-xs text-white/40">
                  <span>{m.profile?.display_name || "用户"}</span>
                  <span>{new Date(m.created_at).toLocaleDateString("zh-CN")}</span>
                  <span className="text-yellow-400">待审核</span>
                </div>
                <p className="text-sm text-white/60 mb-3">{m.content}</p>
                <div className="flex gap-2">
                  <form action={approveMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="text-xs text-green-400 hover:text-green-300">批准</button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="text-xs text-red-400 hover:text-red-300">删除</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-medium text-white mb-4">已处理</h2>
        <div className="flex flex-col gap-3">
          {others.map((m) => (
            <div key={m.id} className="glass-liquid p-5">
              <div className="flex items-center gap-3 mb-2 text-xs text-white/40">
                <span>{m.profile?.display_name || "用户"}</span>
                <span>{new Date(m.created_at).toLocaleDateString("zh-CN")}</span>
                {m.is_pinned && <Pin className="w-3 h-3 text-purple-400 fill-purple-400" />}
                <span className={m.status === "approved" ? "text-green-400" : "text-red-400"}>
                  {m.status === "approved" ? "已批准" : "已拒绝"}
                </span>
              </div>
              <p className="text-sm text-white/60 mb-3">{m.content}</p>
              <div className="flex gap-2">
                <form action={togglePinMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="is_pinned" value={String(m.is_pinned)} />
                  <button type="submit" className="text-xs text-purple-400 hover:text-purple-300">
                    {m.is_pinned ? "取消置顶" : "置顶"}
                  </button>
                </form>
                {m.status === "rejected" && (
                  <form action={approveMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="text-xs text-green-400 hover:text-green-300">批准</button>
                  </form>
                )}
                {m.status === "approved" && (
                  <form action={rejectMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="text-xs text-yellow-400 hover:text-yellow-300">拒绝</button>
                  </form>
                )}
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <button type="submit" className="text-xs text-red-400 hover:text-red-300">删除</button>
                </form>
              </div>
            </div>
          ))}
          {others.length === 0 && <p className="text-white/30 text-sm">暂无已处理留言</p>}
        </div>
      </div>
    </div>
  );
}
