import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  try {
    const decoded: any = jwtDecode(token);
    const rawRole = decoded?.role || decoded?.userRole || "";
    const role = String(rawRole).toUpperCase();

    if (role.includes("ADMIN")) redirect("/dashboard/admin");
    if (role.includes("PROVIDER")) redirect("/dashboard/provider");
    if (role.includes("CUSTOMER") || role.includes("USER")) redirect("/dashboard/customer");
  } catch {
    redirect("/auth/login");
  }

  redirect("/");
}