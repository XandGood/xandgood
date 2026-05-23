import { Hero } from "@/components/hero";
import { BlogCard } from "@/components/blog-card";
import { getPublishedPosts } from "@/lib/data/posts";
import { getTagsWithCount } from "@/lib/data/tags";
import { getSiteSettings } from "@/lib/data/posts";

export default async function Home() {
  const [settings, tags] = await Promise.all([
    getSiteSettings(),
    getTagsWithCount(),
  ]);
  const { posts } = await getPublishedPosts(1, settings?.posts_per_page || 10);
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-5 pt-32 pb-20">
      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          <Hero postCount={posts.length} viewCount={`${posts.length}`} />
          <h2 className="text-sm font-medium text-muted-foreground mb-6">文章</h2>

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

          <div className="flex items-center justify-center gap-4 mt-12">
            <button className="glass-pill px-5 py-2 text-xs text-white/60 hover:text-white hover:bg-white/[0.05] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              上一页
            </button>
            <span className="glass-pill px-4 py-2 text-xs text-white/90">
              1
            </span>
            <button className="glass-pill px-5 py-2 text-xs text-white/60 hover:text-white hover:bg-white/[0.05] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              下一页
            </button>
          </div>
        </div>

        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-32 glass-liquid p-6">
            <h3 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-6">标签气泡</h3>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  className="glass-pill px-4 py-2 text-[11px] text-white/70 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] flex items-center gap-2"
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
  );
}
