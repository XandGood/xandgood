import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Tag } from "@/lib/types";

export const getTags = cache(async function getTags(): Promise<Tag[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tags")
    .select("*")
    .order("name");
  return data || [];
});

export const getTagsWithCount = cache(async function getTagsWithCount() {
  const supabase = await createClient();
  const { data: tags } = await supabase
    .from("tags")
    .select("*, post_tags(count)")
    .order("name");

  if (!tags) return [];

  return tags.map((tag: Record<string, unknown>) => ({
    ...tag,
    count: (tag.post_tags as Array<{ count: number }>)?.[0]?.count || 0,
  })) as Tag[];
});
