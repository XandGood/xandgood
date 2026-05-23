"use client";

import { togglePostStatus, deletePost } from "./actions";
import Link from "next/link";

export function PostsClient({ posts }: { posts: { id: string; title: string; slug: string; status: string; created_at: string; category: { name: string } | null }[] }) {
  const drafts = posts.filter((p) => p.status === "draft");
  const published = posts.filter((p) => p.status === "published");

  return (
    <div>
      {drafts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-white mb-4">草稿 ({drafts.length})</h2>
          <div className="flex flex-col gap-3">
            {drafts.map((post) => (
              <div key={post.id} className="glass-liquid p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium text-sm">{post.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                    <span>{post.category?.name || "无分类"}</span>
                    <span className="text-yellow-400">草稿</span>
                    <span>{new Date(post.created_at).toLocaleDateString("zh-CN")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <form action={togglePostStatus}>
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="current_status" value={post.status} />
                    <button type="submit" className="text-xs text-green-400 hover:text-green-300">
                      发布
                    </button>
                  </form>
                  <Link href={`/admin/posts/${post.id}/edit`} className="text-xs text-purple-400 hover:text-purple-300">
                    编辑
                  </Link>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="text-xs text-red-400 hover:text-red-300">
                      删除
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-medium text-white mb-4">已发布 ({published.length})</h2>
        <div className="flex flex-col gap-3">
          {published.map((post) => (
            <div key={post.id} className="glass-liquid p-5 flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium text-sm">{post.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                  <span>{post.category?.name || "无分类"}</span>
                  <span className="text-green-400">已发布</span>
                  <span>{new Date(post.created_at).toLocaleDateString("zh-CN")}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <form action={togglePostStatus}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="current_status" value={post.status} />
                  <button type="submit" className="text-xs text-yellow-400 hover:text-yellow-300">
                    转为草稿
                  </button>
                </form>
                <Link href={`/admin/posts/${post.id}/edit`} className="text-xs text-purple-400 hover:text-purple-300">
                  编辑
                </Link>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" className="text-xs text-red-400 hover:text-red-300">
                    删除
                  </button>
                </form>
              </div>
            </div>
          ))}
          {published.length === 0 && (
            <p className="text-white/30 text-sm">暂无已发布文章</p>
          )}
        </div>
      </div>

      {posts.length === 0 && (
        <p className="text-white/30 text-sm">暂无文章</p>
      )}
    </div>
  );
}
