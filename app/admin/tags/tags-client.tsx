"use client";

import { createTag, updateTag, deleteTag } from "./actions";

export function TagsClient({ tags }: { tags: { id: string; name: string; slug: string; created_at: string }[] }) {
  return (
    <>
      <form action={createTag} className="glass-liquid p-5 mb-6 flex items-end gap-3">
        <div className="flex-1">
          <label className="text-sm text-white/60 mb-1 block">新标签名称</label>
          <input name="name" type="text" required className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
        </div>
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors">
          添加
        </button>
      </form>

      <div className="flex flex-col gap-3">
        {tags.map((tag) => (
          <div key={tag.id} className="glass-liquid p-5 flex items-center justify-between">
            <span className="text-white text-sm">{tag.name}</span>
            <div className="flex items-center gap-3">
              <form action={updateTag} className="flex items-center gap-2">
                <input type="hidden" name="id" value={tag.id} />
                <input name="name" type="text" required defaultValue={tag.name} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                <button type="submit" className="text-sm text-purple-400 hover:text-purple-300">保存</button>
              </form>
              <form action={deleteTag}>
                <input type="hidden" name="id" value={tag.id} />
                <button type="submit" className="text-sm text-red-400 hover:text-red-300">删除</button>
              </form>
            </div>
          </div>
        ))}
        {tags.length === 0 && (
          <p className="text-white/30 text-sm">暂无标签</p>
        )}
      </div>
    </>
  );
}
