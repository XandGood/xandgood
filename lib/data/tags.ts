import { createClient } from "@/lib/supabase/server";
import type { Tag } from "@/lib/types";

export async function getTags(): Promise<Tag[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tags")
    .select("*")
    .order("name");
  return data || [];
}

export async function getTagsWithCount() {
  const supabase = await createClient();
  const { data: tags } = await supabase.from("tags").select("*").order("name");
  if (!tags) return [];

  const result = [];
  for (const tag of tags) {
    const { count } = await supabase
      .from("post_tags")
      .select("*", { count: "exact", head: true })
      .eq("tag_id", tag.id);
    result.push({ ...tag, count: count || 0 });
  }
  return result;
}
