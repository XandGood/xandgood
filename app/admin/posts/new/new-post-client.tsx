"use client";

import { useState } from "react";
import { createPost } from "../actions";
import { MarkdownEditor } from "@/components/markdown-editor";

export function NewPostClient({ categories, tags }: { categories: { id: string; name: string }[]; tags: { id: string; name: string }[] }) {
  const [content, setContent] = useState("");

  return (
    <form action={createPost} className="glass-liquid p-8 flex flex-col gap-5">
      <div>
        <label className="text-sm text-white/60 mb-1 block">标题</label>
        <input name="title" type="text" required className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-1 block">摘要</label>
        <input name="summary" type="text" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-2 block">正文（Markdown）</label>
        <MarkdownEditor name="content" value={content} onChange={setContent} required />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-1 block">分类</label>
        <select name="category_id" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50">
          <option value="">无分类</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="bg-gray-900">{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm text-white/60 mb-2 block">标签</label>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-2 text-sm text-white/60">
              <input type="checkbox" name="tag_ids" value={tag.id} className="accent-purple-500" />
              {tag.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm text-white/60 mb-2 block">状态</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-white/60">
            <input type="radio" name="status" value="draft" defaultChecked className="accent-purple-500" />
            草稿
          </label>
          <label className="flex items-center gap-2 text-sm text-white/60">
            <input type="radio" name="status" value="published" className="accent-purple-500" />
            发布
          </label>
        </div>
      </div>
      <button type="submit" className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors self-start">
        保存
      </button>
    </form>
  );
}
