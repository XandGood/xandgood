import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeHighlight];

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-purple-400 prose-code:text-purple-300 prose-pre:bg-[#282c34] prose-pre:border prose-pre:border-white/10 prose-pre:shadow-lg"> 
      <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
