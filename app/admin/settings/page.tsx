import { createAdminClient } from "@/lib/supabase/admin";
import { SettingsClient } from "./settings-client";
export default async function AdminSettingsPage() {
  const admin = createAdminClient();
  const { data: settings } = await admin.from("site_settings").select("*").single();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">站点设置</h1>
      <SettingsClient settings={settings || { blog_name: "", description: "", footer: "", posts_per_page: 10 }} />
    </div>
  );
}
