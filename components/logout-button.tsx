"use client";

import { logout } from "@/app/auth/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="text-sm text-white/40 hover:text-white/60 transition-colors">
        退出登录
      </button>
    </form>
  );
}
