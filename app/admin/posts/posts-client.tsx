"use client";

import { createPost, deletePost } from "./actions";
import Link from "next/link";

export function PostsClient({ posts }: { posts: { id: string; title: string; slug: string; status: string; created_at: string; category: { name: string } | null }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <div key={post.id} className="glass-liquid p-5 flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium text-sm">{post.title}</h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
              <span>{post.category?.name || "无分类"}</span>
              <span>{post.status === "published" ? "已发布" : "草稿"}</span>
              <span>{new Date(post.created_at).toLocaleDateString("zh-CN")}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/posts/${post.id}/edit`}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              编辑
            </Link>
            <form action={deletePost}>
              <input type="hidden" name="id" value={post.id} />
              <button type="submit" className="text-sm text-red-400 hover:text-red-300">
                删除
              </button>
            </form>
          </div>
        </div>
      ))}
      {posts.length === 0 && (
        <p className="text-white/30 text-sm">暂无文章</p>
      )}
    </div>
  );
}
