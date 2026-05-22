import { resetPassword } from "./actions";
import Link from "next/link";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center dark text-foreground">
      <div className="w-full max-w-md px-5">
        <div className="glass-liquid p-8">
          <h1 className="text-2xl font-bold text-white mb-6">重置密码</h1>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form action={resetPassword} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-white/60 mb-1 block">新密码（至少8位）</label>
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
              重置密码
            </button>
          </form>

          <p className="text-sm text-white/40 mt-6 text-center">
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
              返回登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
