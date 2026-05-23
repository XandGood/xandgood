interface HeroProps {
  postCount: number;
  viewCount: string;
}

export function Hero({ postCount, viewCount }: HeroProps) {
  return (
    <section className="relative flex items-end justify-between gap-8 pt-6 pb-12">
      <div className="flex flex-col gap-4 relative z-10">
        <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          XandGood
        </h1>
        <p className="text-lg text-white/60 font-light tracking-wide">
          <span className="glass-pill px-4 py-1.5 inline-block">记录思考，分享技术</span>
        </p>
      </div>

      <div className="relative z-10 flex items-center">
        <div className="glass-liquid px-8 py-5 flex items-center gap-10 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col items-start gap-2">
            <span className="flex items-center gap-2 text-[10px] tracking-widest text-white/50 uppercase font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
              </span>
              文章总量
            </span>
            <span className="text-3xl lg:text-4xl font-black tabular-nums text-white/90 drop-shadow-md leading-none">
              {postCount}
            </span>
          </div>

          <div className="w-[1px] h-12 bg-white/10 rounded-full" />

          <div className="flex flex-col items-start gap-2">
            <span className="flex items-center gap-2 text-[10px] tracking-widest text-white/50 uppercase font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" style={{ animationDelay: '1s' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
              </span>
              全站浏览
            </span>
            <span className="text-3xl lg:text-4xl font-black tabular-nums text-white/90 drop-shadow-md leading-none">
              {viewCount}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
