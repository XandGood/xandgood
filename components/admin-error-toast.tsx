"use client";

import { useEffect, useState } from "react";

export function AdminErrorToast() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)admin-error=([^;]*)/);
    if (match) {
      setError(decodeURIComponent(match[1]));
      document.cookie = "admin-error=; max-age=0; path=/admin";
    }
  }, []);

  if (!error) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-red-500/15 backdrop-blur border border-red-500/25 text-red-400 text-sm shadow-lg">
      {error}
      <button
        onClick={() => setError(null)}
        className="ml-3 text-red-400/50 hover:text-red-400"
      >
        ×
      </button>
    </div>
  );
}
