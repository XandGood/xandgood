"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LikeButton({
  postId,
  initialLiked,
  initialCount,
}: {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    setLoading(true);
    try {
      if (liked) {
        await supabase.from("likes").delete().eq("post_id", postId).eq("user_id", user.id);
        setCount((c) => c - 1);
      } else {
        await supabase.from("likes").insert({ post_id: postId, user_id: user.id });
        setCount((c) => c + 1);
      }
      setLiked(!liked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className="flex items-center gap-2 text-sm transition-colors"
    >
      <Heart
        className={`w-5 h-5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-white/40 hover:text-red-400"}`}
      />
      <span className={`tabular-nums ${liked ? "text-red-400" : "text-white/40"}`}>{count}</span>
    </button>
  );
}
