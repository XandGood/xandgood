"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-8 w-8" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="glass rounded-full p-1.5 transition-all duration-300 hover:scale-110 hover:bg-foreground/10"
      aria-label="切换主题"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-foreground/70" />
      ) : (
        <Moon className="h-4 w-4 text-foreground/70" />
      )}
    </button>
  );
}
