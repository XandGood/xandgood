"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeHighlight];

export function MarkdownEditor({ value, onChange, name, required }: { value: string; onChange: (v: string) => void; name?: string; required?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-4 h-[520px]">
      <div className="flex flex-col min-h-0">
        <label className="text-sm text-white/60 mb-1 block shrink-0">编辑</label>
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="flex-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none font-mono"
        />
      </div>
      <div className="flex flex-col min-h-0">
        <label className="text-sm text-white/60 mb-1 block shrink-0">预览</label>
        <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4 overflow-y-auto prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-purple-400 prose-code:text-purple-300 prose-pre:bg-[#282c34] prose-pre:border prose-pre:border-white/10">
          {value ? (
            <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
              {value}
            </ReactMarkdown>
          ) : (
            <p className="text-white/20 text-sm">预览区域</p>
          )}
        </div>
      </div>
    </div>
  );
}
