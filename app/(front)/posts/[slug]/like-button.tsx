"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LikeButton({
  postId,
  initialCount,
}: {
  postId: string;
  initialCount: number;
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      if (!user) return;
      supabase
        .from("likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .then(({ count: c }) => {
          if ((c || 0) > 0) setLiked(true);
        });
    });
  }, [postId]);

  const toggleLike = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth/login");
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
