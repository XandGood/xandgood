import { register } from "./actions";
import Link from "next/link";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center dark text-foreground">
      <div className="w-full max-w-md px-5">
        <div className="glass-liquid p-8">
          <h1 className="text-2xl font-bold text-white mb-6">注册</h1>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {message === "check-email" && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              注册成功！请检查邮箱完成验证后登录。
            </div>
          )}

          {message !== "check-email" && (
            <form action={register} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-white/60 mb-1 block">用户名</label>
                <input
                  name="display_name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
                />
              </div>
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
                <label className="text-sm text-white/60 mb-1 block">密码（至少8位）</label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
              >
                注册
              </button>
            </form>
          )}

          <p className="text-sm text-white/40 mt-6 text-center">
            已有账号？{" "}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
              登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
