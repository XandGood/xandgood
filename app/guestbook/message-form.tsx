"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function MessageForm() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof createClient>["auth"] extends { getUser(): Promise<{ data: { user: infer U } }> } ? U : never>(null as never);

  const supabase = createClient();

  useState(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  });

  const handleSubmit = async () => {
    if (!content.trim()) return;
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      window.location.href = "/auth/login";
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("messages").insert({
        user_id: currentUser.id,
        content: content.trim(),
      });
      if (error) {
        alert("留言发布失败：" + error.message);
        return;
      }
      setContent("");
      alert("留言已提交，审核后可见");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="glass-liquid p-6 text-center">
        <p className="text-sm text-white/40">
          <a href="/auth/login" className="text-purple-400 hover:text-purple-300">登录</a> 后即可留言
        </p>
      </div>
    );
  }

  return (
    <div className="glass-liquid p-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="写下你的留言..."
        rows={3}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none"
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors disabled:opacity-50"
        >
          发布留言
        </button>
      </div>
    </div>
  );
}
