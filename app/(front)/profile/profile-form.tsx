"use client";

import { useState } from "react";

export function ProfileForm({ displayName, email }: { displayName: string; email: string }) {
  const [name, setName] = useState(displayName);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-xs text-white/40 mb-1 block">邮箱</label>
        <p className="text-sm text-white/60">{email}</p>
      </div>
      <div>
        <label className="text-xs text-white/40 mb-1 block">显示名称</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-xs px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
        />
      </div>
      {saved && <p className="text-xs text-green-400">已保存</p>}
    </div>
  );
}
