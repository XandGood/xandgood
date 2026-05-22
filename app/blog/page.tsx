import { getPublishedPosts } from "@/lib/data/posts";
import { getCategories } from "@/lib/data/categories";
import { getTagsWithCount } from "@/lib/data/tags";
import { Nav } from "@/components/nav";
import { BlogCard } from "@/components/blog-card";
import Link from "next/link";

import { unstable_noStore as noStore } from "next/cache";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page: pageStr, category } = await searchParams;
  noStore();
  const page = parseInt(pageStr || "1", 10);
  const { posts, total } = await getPublishedPosts(page, 10, category);
  const categories = await getCategories();
  const tags = await getTagsWithCount();
  const totalPages = Math.ceil(total / 10);

  return (
    <div className="min-h-screen flex flex-col dark text-foreground">
      <div className="fixed inset-0 -z-10 pointer-events-none bg-background">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      <Nav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-5 pt-32 pb-20">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-white mb-8">文章</h1>

            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  summary={post.summary}
                  date={post.published_at ? new Date(post.published_at).toLocaleDateString("zh-CN") : ""}
                  category={post.category?.name}
                  tags={post.tags?.map((t) => t.name)}
                  slug={post.slug}
                />
              ))}
            </div>

            {posts.length === 0 && (
              <p className="text-white/40 text-sm">暂无文章</p>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                {page > 1 && (
                  <Link
                    href={`/blog?page=${page - 1}${category ? `&category=${category}` : ""}`}
                    className="glass-pill px-5 py-2 text-xs text-white/60 hover:text-white hover:bg-white/[0.05]"
                  >
                    上一页
                  </Link>
                )}
                <span className="glass-pill px-4 py-2 text-xs text-white/90">{page}</span>
                {page < totalPages && (
                  <Link
                    href={`/blog?page=${page + 1}${category ? `&category=${category}` : ""}`}
                    className="glass-pill px-5 py-2 text-xs text-white/60 hover:text-white hover:bg-white/[0.05]"
                  >
                    下一页
                  </Link>
                )}
              </div>
            )}
          </div>

          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 glass-liquid p-6 mb-6">
              <h3 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-4">分类</h3>
              <div className="flex flex-col gap-2">
                <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors">
                  全部
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog?category=${cat.id}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="sticky top-[calc(32px+200px)] glass-liquid p-6">
              <h3 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-4">标签</h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    className="glass-pill px-4 py-2 text-[11px] text-white/70 hover:text-white hover:bg-white/[0.08] flex items-center gap-2"
                  >
                    {tag.name}
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-white/10 text-[9px]">{tag.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-white/5 mt-auto relative z-10 glass-liquid rounded-b-none rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-20 px-5 text-xs text-white/40">
          <p>© 2026 Xandgood. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
