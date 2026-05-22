import { createAdminClient } from "@/lib/supabase/admin";
import { CategoriesClient } from "./categories-client";
export default async function AdminCategoriesPage() {
  const admin = createAdminClient();
  const { data: categories } = await admin.from("categories").select("*").order("name");

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">分类管理</h1>
      <CategoriesClient categories={categories || []} />
    </div>
  );
}
