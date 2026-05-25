export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center dark text-foreground bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        <p className="text-sm text-white/40">加载中...</p>
      </div>
    </div>
  );
}
