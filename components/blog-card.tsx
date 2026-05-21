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
    <Link href={`/posts/${slug}`} className="group block">
      <article className="glass rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/[0.07] hover:border-foreground/10">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </span>
          {category && (
            <span className="glass rounded-full px-2 py-0.5 text-[11px]">
              {category}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground/90 transition-colors leading-snug">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {summary}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <Tag className="w-3 h-3 text-muted-foreground/40" />
            <div className="flex gap-1.5 flex-wrap">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] text-muted-foreground/50"
                >
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
