"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center dark text-foreground bg-background">
      <div className="glass-liquid p-8 max-w-md text-center">
        <h2 className="text-xl font-bold text-white mb-3">出错了</h2>
        <p className="text-sm text-white/40 mb-6">
          {error.message || "页面发生未知错误，请稍后重试。"}
        </p>
        <button
          onClick={reset}
          className="glass-pill px-5 py-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  );
}
