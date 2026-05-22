"use client";

import { toggleBanUser } from "./actions";

export function UsersClient({ profiles }: { profiles: { id: string; display_name: string | null; is_banned: boolean; created_at: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {profiles.map((profile) => (
        <div key={profile.id} className="glass-liquid p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm font-medium">{profile.display_name || "未设置名称"}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${profile.is_banned ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                {profile.is_banned ? "已禁用" : "正常"}
              </span>
            </div>
            <p className="text-xs text-white/30 mt-1">
              注册时间：{new Date(profile.created_at).toLocaleDateString("zh-CN")}
            </p>
          </div>
          <form action={toggleBanUser}>
            <input type="hidden" name="id" value={profile.id} />
            <input type="hidden" name="is_banned" value={String(profile.is_banned)} />
            <button
              type="submit"
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                profile.is_banned
                  ? "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                  : "bg-red-600/20 text-red-400 hover:bg-red-600/30"
              }`}
            >
              {profile.is_banned ? "启用" : "禁用"}
            </button>
          </form>
        </div>
      ))}
      {profiles.length === 0 && (
        <p className="text-white/30 text-sm">暂无用户</p>
      )}
    </div>
  );
}
