import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

interface BlogCardProps {
  title: string;
  summary: string;
  date: string;
  category?: string;
  tags?: string[];
  slug: string;
}

export function BlogCard({
  title,
  summary,
  date,
  category,
  tags,
  slug,
}: BlogCardProps) {
  return (
    <Link href={`/posts/${slug}`} className="group block outline-none">
      <article className="glass-liquid p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(139,92,246,0.15)] hover:border-white/[0.1] relative overflow-hidden">
        {/* Hover Flare */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5" />
        
        <div className="flex items-center gap-4 text-xs tracking-wider text-white/50 mb-4 relative z-10">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-white/40" />
            {date}
          </span>
          {category && (
            <span className="glass-pill px-3 py-1.5 text-[10px] uppercase text-white/70">
              {category}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-100 transition-colors relative z-10 leading-snug">
          {title}
        </h3>

        <p className="text-sm text-white/60 leading-relaxed max-w-2xl relative z-10 line-clamp-2">
          {summary}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex items-center gap-2 mt-6 relative z-10">
            <Tag className="w-3.5 h-3.5 text-white/30" />
            <div className="flex gap-2">
              {tags.map((t) => (
                <span key={t} className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </Link>
  );
}
