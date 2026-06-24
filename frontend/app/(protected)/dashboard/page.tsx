"use client";

import { AdminDashboardPage } from "@/features/dashboard/pages/AdminDashboardPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
export default function Home() {
  const { data: user } = useCurrentUser();
  return user?.role === "ADMIN" ? <AdminDashboardPage /> : <DashboardPage />;
}
