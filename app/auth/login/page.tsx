import { login } from "./actions";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center dark text-foreground">
      <div className="w-full max-w-md px-5">
        <div className="glass-liquid p-8">
          <h1 className="text-2xl font-bold text-white mb-6">登录</h1>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form action={login} className="flex flex-col gap-4">
            <input type="hidden" name="next" value={next || ""} />
            <div>
              <label className="text-sm text-white/60 mb-1 block">邮箱</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-1 block">密码</label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-white/60">
                <input name="remember" type="checkbox" className="accent-purple-500" />
                记住我
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                忘记密码？
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
            >
              登录
            </button>
          </form>

          <p className="text-sm text-white/40 mt-6 text-center">
            没有账号？{" "}
            <Link href="/auth/register" className="text-purple-400 hover:text-purple-300">
              注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
