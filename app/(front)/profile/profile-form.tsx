"use client";

import { useState } from "react";
import { updateDisplayName } from "./actions";
import { useToast } from "@/components/toaster";

export function ProfileForm({ displayName, email }: { displayName: string; email: string }) {
  const [name, setName] = useState(displayName);
  const [loading, setLoading] = useState(false);
  const { success, error: showError } = useToast();

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("display_name", name);
      await updateDisplayName(formData);
      success("显示名称已更新");
    } catch {
      showError("更新失败");
    } finally {
      setLoading(false);
    }
  };

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
      <button
        onClick={handleSave}
        disabled={loading}
        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors self-start disabled:opacity-50"
      >
        保存
      </button>
    </div>
  );
}
