import { requireAdmin } from "./admin-guard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function adminAction(
  name: string,
  fn: (formData: FormData) => Promise<void>
): (formData: FormData) => Promise<void> {
  return async (formData) => {
    await requireAdmin();

    const t0 = Date.now();
    try {
      await fn(formData);
    } catch (e) {
      if (isRedirectError(e)) {
        console.log(`[admin] ${name} → redirect (${Date.now() - t0}ms)`);
        throw e;
      }

      const message =
        typeof e === "object" && e !== null && "message" in e
          ? String(e.message)
          : "操作失败";

      console.error(`[admin] ${name} ✗ ${Date.now() - t0}ms`, message);

      const cookieStore = await cookies();
      cookieStore.set("admin-error", encodeURIComponent(message), {
        maxAge: 10,
        path: "/admin",
      });

      redirect("/admin");
    }
  };
}

function isRedirectError(e: unknown): boolean {
  return (
    typeof e === "object" &&
    e !== null &&
    "digest" in e &&
    typeof (e as Record<string, unknown>).digest === "string" &&
    ((e as Record<string, unknown>).digest as string).startsWith("NEXT_REDIRECT")
  );
}
