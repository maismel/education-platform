import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { AppSidebar } from "@/features/navigation/components/AppSidebar";

type TokenPayload = {
  sub: string;
  email: string;
  role: "TEACHER" | "STUDENT" | "ADMIN";
  exp: number;
  iat: number;
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
