import Link from "next/link";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center dark text-foreground">
      <div className="w-full max-w-md px-5">
        <div className="glass-liquid p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">认证错误</h1>
          <p className="text-white/60 text-sm mb-6">
            {error || "发生了未知错误"}
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
          >
            返回登录
          </Link>
        </div>
      </div>
    </div>
  );
}
