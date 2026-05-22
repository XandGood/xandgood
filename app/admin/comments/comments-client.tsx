"use client";

import { approveComment, rejectComment, deleteComment, batchApproveComments, batchDeleteComments } from "./actions";
import type { Profile } from "@/lib/types";

export function CommentsClient({ comments }: { comments: { id: string; user_id: string; content: string; status: string; created_at: string; profile: Profile | null }[] }) {
  const pending = comments.filter((c) => c.status === "pending");
  const others = comments.filter((c) => c.status !== "pending");

  return (
    <div>
      {pending.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">待审核 ({pending.length})</h2>
            <div className="flex gap-2">
              <form action={batchApproveComments}>
                {pending.map((c) => (
                  <input key={c.id} type="hidden" name="ids" value={c.id} />
                ))}
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-green-600/20 text-green-400 text-xs hover:bg-green-600/30 transition-colors">
                  全部批准
                </button>
              </form>
              <form action={batchDeleteComments}>
                {pending.map((c) => (
                  <input key={c.id} type="hidden" name="ids" value={c.id} />
                ))}
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 text-xs hover:bg-red-600/30 transition-colors">
                  全部删除
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {pending.map((c) => (
              <div key={c.id} className="glass-liquid p-5">
                <div className="flex items-center gap-3 mb-2 text-xs text-white/40">
                  <span>{c.profile?.display_name || "用户"}</span>
                  <span>{new Date(c.created_at).toLocaleDateString("zh-CN")}</span>
                  <span className="text-yellow-400">待审核</span>
                </div>
                <p className="text-sm text-white/60 mb-3">{c.content}</p>
                <div className="flex gap-2">
                  <form action={approveComment}>
                    <input type="hidden" name="id" value={c.id} />
                    <button type="submit" className="text-xs text-green-400 hover:text-green-300">批准</button>
                  </form>
                  <form action={deleteComment}>
                    <input type="hidden" name="id" value={c.id} />
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
          {others.map((c) => (
            <div key={c.id} className="glass-liquid p-5">
              <div className="flex items-center gap-3 mb-2 text-xs text-white/40">
                <span>{c.profile?.display_name || "用户"}</span>
                <span>{new Date(c.created_at).toLocaleDateString("zh-CN")}</span>
                <span className={c.status === "approved" ? "text-green-400" : "text-red-400"}>
                  {c.status === "approved" ? "已批准" : "已拒绝"}
                </span>
              </div>
              <p className="text-sm text-white/60 mb-3">{c.content}</p>
              <div className="flex gap-2">
                {c.status === "rejected" && (
                  <form action={approveComment}>
                    <input type="hidden" name="id" value={c.id} />
                    <button type="submit" className="text-xs text-green-400 hover:text-green-300">批准</button>
                  </form>
                )}
                {c.status === "approved" && (
                  <form action={rejectComment}>
                    <input type="hidden" name="id" value={c.id} />
                    <button type="submit" className="text-xs text-yellow-400 hover:text-yellow-300">拒绝</button>
                  </form>
                )}
                <form action={deleteComment}>
                  <input type="hidden" name="id" value={c.id} />
                  <button type="submit" className="text-xs text-red-400 hover:text-red-300">删除</button>
                </form>
              </div>
            </div>
          ))}
          {others.length === 0 && <p className="text-white/30 text-sm">暂无已处理评论</p>}
        </div>
      </div>
    </div>
  );
}
