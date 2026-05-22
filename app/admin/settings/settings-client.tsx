"use client";

import { updateSettings } from "./actions";

export function SettingsClient({ settings }: { settings: { blog_name: string; description: string; footer: string; posts_per_page: number } }) {
  return (
    <form action={updateSettings} className="glass-liquid p-8 flex flex-col gap-5">
      <div>
        <label className="text-sm text-white/60 mb-1 block">博客名称</label>
        <input name="blog_name" type="text" required defaultValue={settings.blog_name} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-1 block">首页简介</label>
        <input name="description" type="text" defaultValue={settings.description} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-1 block">页脚信息</label>
        <input name="footer" type="text" defaultValue={settings.footer} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-1 block">每页文章数</label>
        <input name="posts_per_page" type="number" min={1} max={50} required defaultValue={settings.posts_per_page} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
      </div>
      <button type="submit" className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors self-start">
        保存设置
      </button>
    </form>
  );
}
