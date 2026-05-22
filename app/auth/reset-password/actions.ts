"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function resetPassword(formData: FormData) {
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return redirect(`/auth/reset-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/auth/login?message=password-reset");
}
