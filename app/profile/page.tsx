import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import { ProfileForm } from "./profile-form";
import type { Comment, Like, Post } from "@/lib/types";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const [{ data: profile }, { data: comments }, { data: likes }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("comments").select("*, post:posts(id, title, slug)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
    supabase.from("likes").select("*, post:posts(id, title, slug)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
  ]);

  return (
    <div className="min-h-screen flex flex-col dark text-foreground">
      <div className="fixed inset-0 -z-10 pointer-events-none bg-background">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      <Nav />

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 pt-32 pb-20">
        <h1 className="text-3xl font-bold text-white mb-8">个人中心</h1>

        <div className="glass-liquid p-8 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">基本信息</h2>
          <ProfileForm
            displayName={profile?.display_name || ""}
            email={user.email || ""}
          />
        </div>

        <div className="glass-liquid p-8 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">我的评论</h2>
          <div className="flex flex-col gap-3">
            {(comments as (Comment & { post: Post })[])?.map((c) => (
              <div key={c.id} className="border-l-2 border-white/10 pl-4">
                <div className="flex items-center gap-2 text-xs text-white/30 mb-1">
                  <span>
                    {c.status === "pending" ? "待审核" : c.status === "approved" ? "已通过" : "已拒绝"}
                  </span>
                  <span>{new Date(c.created_at).toLocaleDateString("zh-CN")}</span>
                  {c.post && (
                    <a href={`/posts/${c.post.slug}`} className="text-purple-400 hover:text-purple-300">
                      {c.post.title}
                    </a>
                  )}
                </div>
                <p className="text-sm text-white/60">{c.content}</p>
              </div>
            ))}
            {(!comments || comments.length === 0) && (
              <p className="text-white/30 text-sm">暂无评论</p>
            )}
          </div>
        </div>

        <div className="glass-liquid p-8">
          <h2 className="text-lg font-bold text-white mb-4">我的点赞</h2>
          <div className="flex flex-col gap-3">
            {(likes as (Like & { post: Post })[])?.map((l) => (
              <div key={l.id} className="flex items-center gap-2 text-sm">
                <span className="text-white/30">{new Date(l.created_at).toLocaleDateString("zh-CN")}</span>
                {l.post && (
                  <a href={`/posts/${(l.post as Post).slug}`} className="text-purple-400 hover:text-purple-300">
                    {(l.post as Post).title}
                  </a>
                )}
              </div>
            ))}
            {(!likes || likes.length === 0) && (
              <p className="text-white/30 text-sm">暂无点赞</p>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 mt-auto relative z-10 glass-liquid rounded-b-none rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-20 px-5 text-xs text-white/40">
          <p>© 2026 XandGood. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
