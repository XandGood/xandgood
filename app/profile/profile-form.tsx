"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ProfileForm({
  displayName,
  email,
}: {
  displayName: string;
  email: string;
}) {
  const [name, setName] = useState(displayName);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();

  const updateName = async () => {
    const { error: err } = await supabase
      .from("profiles")
      .update({ display_name: name })
      .eq("id", (await supabase.auth.getUser()).data.user?.id);

    if (err) setError(err.message);
    else setMessage("显示名称已更新");
  };

  const updatePassword = async () => {
    if (newPassword.length < 8) {
      setError("密码至少8位");
      return;
    }
    const { error: err } = await supabase.auth.updateUser({ password: newPassword });
    if (err) setError(err.message);
    else {
      setMessage("密码已更新");
      setNewPassword("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {message && <p className="text-sm text-green-400">{message}</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div>
        <label className="text-sm text-white/60 mb-1 block">邮箱（不可修改）</label>
        <input
          value={email}
          disabled
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 text-sm"
        />
      </div>

      <div>
        <label className="text-sm text-white/60 mb-1 block">显示名称</label>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
          />
          <button
            onClick={updateName}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
          >
            保存
          </button>
        </div>
      </div>

      <div>
        <label className="text-sm text-white/60 mb-1 block">修改密码</label>
        <div className="flex gap-2">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="输入新密码（至少8位）"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
          />
          <button
            onClick={updatePassword}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
          >
            更新密码
          </button>
        </div>
      </div>
    </div>
  );
}
