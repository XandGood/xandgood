import { createAdminClient } from "@/lib/supabase/admin";
import { UsersClient } from "./users-client";
export default async function AdminUsersPage() {
  const admin = createAdminClient();
  const { data: profiles } = await admin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">用户管理</h1>
      <UsersClient profiles={profiles || []} />
    </div>
  );
}
