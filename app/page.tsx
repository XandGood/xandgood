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
    <div className="min-h-screen flex flex-col relative">
      {/* Background orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 glass-darker">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-5">
          <span className="font-semibold text-sm tracking-tight">Xandgood</span>
          <ThemeSwitcher />
        </div>
      </nav>

      {/* Hero + Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-5 pb-20">
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
            <div className="flex items-center justify-center gap-2 mt-10">
              <button className="glass rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-foreground/10">
                上一页
              </button>
              <span className="glass rounded-lg px-3 py-1.5 text-xs text-foreground/80">
                1
              </span>
              <button className="glass rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-foreground/10">
                下一页
              </button>
            </div>
          </div>

          {/* Right: tags sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-20">
              <h3 className="text-xs font-medium text-muted-foreground mb-4">标签</h3>
              <div className="flex flex-col gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.name}
                    className="glass rounded-full px-3 py-1.5 text-xs text-muted-foreground text-left transition-all duration-300 hover:bg-foreground/10 hover:text-foreground/80 w-fit"
                  >
                    {tag.name}
                    <span className="ml-1.5 text-muted-foreground/40">{tag.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-5 text-xs text-muted-foreground">
          <p>Xandgood</p>
        </div>
      </footer>
    </div>
  );
}
