import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasEnvVars =
  process.env.NEXT_PUBLIC_XAG_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_XAG_SUPABASE_PUBLISHABLE_KEY;

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
