interface HeroProps {
  postCount: number;
  viewCount: string;
}

export function Hero({ postCount, viewCount }: HeroProps) {
  return (
    <section className="relative flex items-end justify-between gap-8 pt-16 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
          Xandgood
        </h1>
        <p className="text-base text-muted-foreground">
          记录思考，分享技术
        </p>
      </div>

      <div className="flex items-end gap-6 pb-1">
        <div className="flex flex-col items-end">
          <span className="text-3xl lg:text-4xl font-bold tabular-nums">{postCount}</span>
          <span className="text-xs text-muted-foreground">篇文章</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-3xl lg:text-4xl font-bold tabular-nums">{viewCount}</span>
          <span className="text-xs text-muted-foreground">次浏览</span>
        </div>
      </div>
    </section>
  );
}
