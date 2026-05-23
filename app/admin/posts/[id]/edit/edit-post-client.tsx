"use client";

import { useState } from "react";
import { updatePost } from "../../actions";
import { MarkdownEditor } from "@/components/markdown-editor";

function pill(active: boolean) {
  return active
    ? "px-4 py-2 rounded-full text-sm border cursor-pointer transition-colors bg-purple-600/20 border-purple-500/30 text-purple-300"
    : "px-4 py-2 rounded-full text-sm border cursor-pointer transition-colors bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70";
}

export function EditPostClient({ post, categories, tags, selectedTagIds }: { post: { id: string; title: string; slug: string; content: string; summary: string; category_id: string | null; status: string }; categories: { id: string; name: string }[]; tags: { id: string; name: string }[]; selectedTagIds: Set<string> }) {
  const [content, setContent] = useState(post.content);
  const [categoryId, setCategoryId] = useState(post.category_id || "");
  const [tagIds, setTagIds] = useState<Set<string>>(selectedTagIds);
  const [tagSearch, setTagSearch] = useState("");

  const toggleTag = (id: string) => {
    setTagIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = tags.filter((t) => t.name.includes(tagSearch));
  const selectedTags = tags.filter((t) => tagIds.has(t.id));
  const availableTags = filtered.filter((t) => !tagIds.has(t.id));

  return (
    <form action={updatePost} className="glass-liquid p-8 flex flex-col gap-5">
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="slug" value={post.slug} />
      <div>
        <label className="text-sm text-white/60 mb-1 block">标题</label>
        <input name="title" type="text" required defaultValue={post.title} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-1 block">摘要</label>
        <input name="summary" type="text" defaultValue={post.summary} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-2 block">正文（Markdown）</label>
        <MarkdownEditor name="content" value={content} onChange={setContent} required />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-2 block">分类</label>
        <input type="hidden" name="category_id" value={categoryId} />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setCategoryId("")} className={pill(categoryId === "")}>
            无分类
          </button>
          {categories.map((cat) => (
            <button type="button" key={cat.id} onClick={() => setCategoryId(cat.id)} className={pill(categoryId === cat.id)}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm text-white/60 mb-2 block">标签</label>
        {Array.from(tagIds).map((id) => (
          <input key={id} type="hidden" name="tag_ids" value={id} />
        ))}
        <input
          type="text"
          placeholder="搜索标签..."
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 mb-3"
        />
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedTags.map((tag) => (
              <button type="button" key={tag.id} onClick={() => toggleTag(tag.id)} className={pill(true)}>
                {tag.name} ×
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button type="button" key={tag.id} onClick={() => toggleTag(tag.id)} className={pill(false)}>
              {tag.name}
            </button>
          ))}
        </div>
        {filtered.length === 0 && tagSearch && (
          <p className="text-xs text-white/30 mt-2">无匹配标签</p>
        )}
      </div>
      <div>
        <label className="text-sm text-white/60 mb-2 block">状态</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-white/60">
            <input type="radio" name="status" value="draft" defaultChecked={post.status === "draft"} className="accent-purple-500" />
            草稿
          </label>
          <label className="flex items-center gap-2 text-sm text-white/60">
            <input type="radio" name="status" value="published" defaultChecked={post.status === "published"} className="accent-purple-500" />
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
