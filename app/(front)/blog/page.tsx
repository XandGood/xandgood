import { getPublishedPosts } from "@/lib/data/posts";
import { getCategories } from "@/lib/data/categories";
import { getTagsWithCount } from "@/lib/data/tags";
import { BlogCard } from "@/components/blog-card";
import Link from "next/link";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page: pageStr, category } = await searchParams;
  const page = parseInt(pageStr || "1", 10);
  const [{ posts, total }, categories, tags] = await Promise.all([
    getPublishedPosts(page, 10, category),
    getCategories(),
    getTagsWithCount(),
  ]);
  const totalPages = Math.ceil(total / 10);

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-5 pt-32 pb-20">
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="lg:flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-white mb-8">文章</h1>

          <div className="glass-liquid p-5 mb-8 lg:hidden">
            <h3 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-3">分类</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                  !category
                    ? "bg-purple-600/20 border-purple-500/30 text-purple-300"
                    : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70"
                }`}
              >
                全部
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.id}`}
                  className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                    category === cat.id
                      ? "bg-purple-600/20 border-purple-500/30 text-purple-300"
                      : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

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
          <div className="sticky top-32 flex flex-col gap-6">
            <div className="glass-liquid p-6">
              <h3 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-4">分类</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog"
                  className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                    !category
                      ? "bg-purple-600/20 border-purple-500/30 text-purple-300"
                      : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70"
                  }`}
                >
                  全部
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog?category=${cat.id}`}
                    className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                      category === cat.id
                        ? "bg-purple-600/20 border-purple-500/30 text-purple-300"
                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="glass-liquid p-6">
              <h3 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-4">标签</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-4 py-2 rounded-full text-[11px] border bg-white/5 border-white/10 text-white/50 flex items-center gap-2"
                  >
                    {tag.name}
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-white/10 text-[9px]">{tag.count}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
