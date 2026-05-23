"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { logout } from "@/app/auth/actions";

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return {};
  }
}

export function Nav() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.access_token) {
        const claims = parseJwt(data.session.access_token);
        setIsAdmin(claims.app_metadata?.is_admin === true);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.access_token) {
        const claims = parseJwt(session.access_token);
        setIsAdmin(claims.app_metadata?.is_admin === true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-7xl glass-pill px-6 h-14 flex items-center justify-between">
      <Link href="/" className="font-bold text-sm tracking-widest uppercase text-white/90">
        XANDGOOD
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">首页</Link>
        <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors">文章</Link>
        <Link href="/guestbook" className="text-sm text-white/60 hover:text-white transition-colors">留言板</Link>
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/profile" className="text-sm text-white/60 hover:text-white transition-colors">
              个人中心
            </Link>
            {isAdmin && (
              <Link href="/admin" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                后台
              </Link>
            )}
            <form action={logout}>
              <button type="submit" className="text-sm text-white/40 hover:text-white/70 transition-colors">
                退出
              </button>
            </form>
          </div>
        ) : (
          <Link href="/auth/login" className="glass-pill px-4 py-1.5 text-xs text-white/70 hover:text-white transition-colors">
            登录
          </Link>
        )}
      </div>

      <button className="md:hidden text-white/70" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 glass-liquid p-4 flex flex-col gap-3 md:hidden">
          <Link href="/" className="text-sm text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>首页</Link>
          <Link href="/blog" className="text-sm text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>文章</Link>
          <Link href="/guestbook" className="text-sm text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>留言板</Link>
          {user ? (
            <>
              <Link href="/profile" className="text-sm text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>个人中心</Link>
              {isAdmin && (
                <Link href="/admin" className="text-sm text-purple-400" onClick={() => setMenuOpen(false)}>后台</Link>
              )}
              <form action={logout}><button type="submit" className="text-sm text-white/40 hover:text-white/70">退出</button></form>
            </>
          ) : (
            <Link href="/auth/login" className="text-sm text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>登录</Link>
          )}
        </div>
      )}
    </nav>
  );
}
