import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { FileText, FolderOpen, Tag, MessageSquare, BookOpen, Users, Settings } from "lucide-react";
const navItems = [
  { href: "/admin/posts", label: "文章管理", icon: FileText },
  { href: "/admin/categories", label: "分类管理", icon: FolderOpen },
  { href: "/admin/tags", label: "标签管理", icon: Tag },
  { href: "/admin/comments", label: "评论审核", icon: MessageSquare },
  { href: "/admin/messages", label: "留言管理", icon: BookOpen },
  { href: "/admin/users", label: "用户管理", icon: Users },
  { href: "/admin/settings", label: "站点设置", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();

  if (!claimsData?.claims) redirect("/auth/login");

  if (claimsData?.claims?.app_metadata?.is_admin !== true) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex dark text-foreground">
      <aside className="w-64 shrink-0 border-r border-white/5 bg-white/[0.01] p-6">
        <Link href="/admin" className="font-bold text-sm tracking-widest uppercase text-white/90 mb-8 block">
          后台管理
        </Link>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8 flex flex-col gap-2">
          <Link href="/" className="text-sm text-white/40 hover:text-white/60 transition-colors">
            返回前台
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
