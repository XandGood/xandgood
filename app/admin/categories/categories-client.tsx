"use client";

import { createCategory, updateCategory, deleteCategory } from "./actions";

export function CategoriesClient({ categories }: { categories: { id: string; name: string; slug: string; created_at: string }[] }) {
  return (
    <>
      <form action={createCategory} className="glass-liquid p-5 mb-6 flex items-end gap-3">
        <div className="flex-1">
          <label className="text-sm text-white/60 mb-1 block">新分类名称</label>
          <input name="name" type="text" required className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
        </div>
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors">
          添加
        </button>
      </form>

      <div className="flex flex-col gap-3">
        {categories.map((cat) => (
          <div key={cat.id} className="glass-liquid p-5 flex items-center justify-between">
            <span className="text-white text-sm">{cat.name}</span>
            <div className="flex items-center gap-3">
              <form action={updateCategory} className="flex items-center gap-2">
                <input type="hidden" name="id" value={cat.id} />
                <input name="name" type="text" required defaultValue={cat.name} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                <button type="submit" className="text-sm text-purple-400 hover:text-purple-300">保存</button>
              </form>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={cat.id} />
                <button type="submit" className="text-sm text-red-400 hover:text-red-300">删除</button>
              </form>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-white/30 text-sm">暂无分类</p>
        )}
      </div>
    </>
  );
}
