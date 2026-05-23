"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/toaster";
import type { Comment, Profile } from "@/lib/types";

export function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof createClient>["auth"] extends { getUser(): Promise<{ data: { user: infer U } }> } ? U : never>(null as never);
  const { success, error: showError } = useToast();

  const loadComments = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .eq("status", "approved")
      .order("created_at", { ascending: true });

    if (data && data.length > 0) {
      const userIds = [...new Set(data.map((c: Comment) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .in("id", userIds);

      const profileMap = new Map((profiles || []).map((p) => [p.id, p]));
      const commentsWithProfiles = data.map((c: Comment) => ({
        ...c,
        profile: profileMap.get(c.user_id) as Profile | undefined,
      }));

      const topLevel = commentsWithProfiles.filter((c: Comment) => !c.parent_id);
      const withReplies = topLevel.map((c: Comment) => ({
        ...c,
        replies: commentsWithProfiles.filter((r: Comment) => r.parent_id === c.id),
      }));
      setComments(withReplies as Comment[]);
    }
  }, [postId]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    loadComments();
  }, [loadComments]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    const supabase = createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      window.location.href = "/auth/login";
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("comments").insert({
        post_id: postId,
        user_id: currentUser.id,
        content: content.trim(),
        parent_id: replyTo,
      });
      if (error) {
        showError("评论提交失败：" + error.message);
        return;
      }
      setContent("");
      setReplyTo(null);
      success("评论已提交，审核后可见");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-liquid p-8">
      <h3 className="text-lg font-bold text-white mb-6">评论</h3>

      {user ? (
        <div className="mb-6">
          {replyTo && (
            <div className="mb-2 text-xs text-purple-400">
              回复评论 · <button onClick={() => setReplyTo(null)} className="text-white/40 hover:text-white/60">取消</button>
            </div>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的评论..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              提交评论
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-white/40 mb-6">
          <a href="/auth/login" className="text-purple-400 hover:text-purple-300">登录</a> 后即可评论
        </p>
      )}

      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-l-2 border-white/10 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-white/80">
                {(comment.profile as Profile)?.display_name || "用户"}
              </span>
              <span className="text-xs text-white/30">
                {new Date(comment.created_at).toLocaleDateString("zh-CN")}
              </span>
            </div>
            <p className="text-sm text-white/60">{comment.content}</p>
            {user && (
              <button
                onClick={() => setReplyTo(comment.id)}
                className="text-xs text-purple-400 hover:text-purple-300 mt-1"
              >
                回复
              </button>
            )}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-3 ml-4 flex flex-col gap-3">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="border-l-2 border-white/5 pl-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white/70">
                        {(reply.profile as Profile)?.display_name || "用户"}
                      </span>
                      <span className="text-xs text-white/30">
                        {new Date(reply.created_at).toLocaleDateString("zh-CN")}
                      </span>
                    </div>
                    <p className="text-sm text-white/50">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-white/30">暂无评论</p>
        )}
      </div>
    </div>
  );
}
