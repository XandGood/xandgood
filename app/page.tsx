import { Hero } from "@/components/hero";
import { BlogCard } from "@/components/blog-card";
import { ThemeSwitcher } from "@/components/theme-switcher";

const posts = [
  {
    title: "构建现代博客的技术选型",
    summary: "从零开始搭建一个基于 Next.js 和 Supabase 的个人博客，聊聊技术栈的选择与权衡。",
    date: "2026-05-20",
    category: "前端",
    tags: ["Next.js", "Supabase", "TypeScript"],
    slug: "tech-stack-for-blog",
  },
  {
    title: "TypeScript 高级类型体操",
    summary: "深入探索条件类型、模板字面量类型、infer 关键字等进阶技巧。",
    date: "2026-05-15",
    category: "TypeScript",
    tags: ["TypeScript", "类型系统"],
    slug: "typescript-advanced-types",
  },
  {
    title: "设计模式在实际项目中的应用",
    summary: "观察者模式、策略模式、工厂模式在前端项目中的真实案例与思考。",
    date: "2026-05-10",
    category: "架构",
    tags: ["设计模式", "架构"],
    slug: "design-patterns-in-practice",
  },
  {
    title: "React 19 新特性速览",
    summary: "Server Components、Actions、use() hook 等新特性一网打尽。",
    date: "2026-05-05",
    category: "前端",
    tags: ["React", "Next.js"],
    slug: "react-19-new-features",
  },
];

const tags = [
  { name: "Next.js", count: 3 },
  { name: "React", count: 2 },
  { name: "TypeScript", count: 2 },
  { name: "Supabase", count: 1 },
  { name: "设计模式", count: 1 },
  { name: "架构", count: 1 },
  { name: "前端", count: 2 },
  { name: "类型系统", count: 1 },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative dark text-foreground selection:bg-purple-500/30 overflow-x-hidden">
      {/* Liquid Background orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-background">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      {/* Floating Pill Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-7xl glass-pill px-6 h-14 flex items-center justify-between ml-2 sm:ml-6 lg:ml-12 transition-all duration-700">
        <span className="font-bold text-sm tracking-widest uppercase text-white/90">XANDGOOD</span>
        <ThemeSwitcher />
      </nav>

      {/* Hero + Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-5 pt-32 pb-20 translate-x-3 sm:translate-x-6 lg:translate-x-12 transition-transform duration-700">
        <div className="flex gap-8">
          {/* Left: hero + article list */}
          <div className="flex-1 min-w-0">
            <Hero postCount={4} viewCount="3.2k" />
            <h2 className="text-sm font-medium text-muted-foreground mb-6">文章</h2>

            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>

            {/* Pagination */}
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

          {/* Right: tags sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 glass-liquid p-6">
              <h3 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-6">标签气泡</h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <button
                    key={tag.name}
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

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto relative z-10 glass-liquid rounded-b-none rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-20 px-5 text-xs text-white/40">
          <p>© 2026 Xandgood. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
