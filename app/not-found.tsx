import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center dark text-foreground bg-background">
      <div className="glass-liquid p-8 max-w-md text-center">
        <h2 className="text-5xl font-black text-white/20 mb-4">404</h2>
        <p className="text-sm text-white/40 mb-6">页面不存在</p>
        <Link
          href="/"
          className="glass-pill px-5 py-2 text-sm text-white/70 hover:text-white transition-colors inline-block"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
