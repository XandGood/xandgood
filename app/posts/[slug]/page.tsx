import { getPostBySlug } from "@/lib/data/posts";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { LikeButton } from "./like-button";
import { Comments } from "./comments";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

import { unstable_noStore as noStore } from "next/cache";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  noStore();
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col dark text-foreground">
      <div className="fixed inset-0 -z-10 pointer-events-none bg-background">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-5 pt-32 pb-20">
        <article>
          <div className="glass-liquid p-8 sm:p-12">
            <div className="flex items-center gap-4 text-xs tracking-wider text-white/50 mb-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-white/40" />
                {post.published_at ? new Date(post.published_at).toLocaleDateString("zh-CN") : "未发布"}
              </span>
              {post.category && (
                <Link href={`/blog?category=${post.category.id}`} className="glass-pill px-3 py-1.5 text-[10px] uppercase text-white/70 hover:text-white">
                  {post.category.name}
                </Link>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-8">
                <Tag className="w-3.5 h-3.5 text-white/30" />
                <div className="flex gap-2">
                  {post.tags.map((t) => (
                    <span key={t.id} className="text-xs text-white/40">#{t.name}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-white/5 pt-8">
              <MarkdownRenderer content={post.content} />
            </div>

            <div className="border-t border-white/5 mt-8 pt-6">
              <LikeButton postId={post.id} initialLiked={post.user_liked || false} initialCount={post.likes_count || 0} />
            </div>
          </div>
        </article>

        <div className="mt-8">
          <Comments postId={post.id} />
        </div>
      </main>
    </div>
  );
}
