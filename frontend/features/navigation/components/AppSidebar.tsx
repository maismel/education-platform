"use client";

import { SidebarLg } from "@/features/navigation/components/SidebarLg";
import { MobileNav } from "@/features/navigation/components/MobileNav";
import {
  HouseIcon,
  GraduationCapIcon,
  UserRoundIcon,
  CalendarIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SubmitDialog } from "@/shared/components/SubmitDialog";
import { useState } from "react";
import { useLogout } from "@/features/auth/api/useLogout";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <HouseIcon /> },
  { label: "Courses", href: "/courses", icon: <GraduationCapIcon /> },
  { label: "Calendar", href: "/calendar", icon: <CalendarIcon /> },
  { label: "Profile", href: "/profile", icon: <UserRoundIcon /> },
];

export const AppSidebar = () => {
  const pathname = usePathname() ?? "";
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: logout } = useLogout();

  return (
    <>
      <SidebarLg
        navItems={navItems}
        pathname={pathname}
        onLogout={() => setIsDialogOpen(true)}
      />
      <MobileNav
        navItems={navItems}
        pathname={pathname}
        onLogout={() => setIsDialogOpen(true)}
      />
      <SubmitDialog
        title="Logout"
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSubmit={logout}
      />
    </>
  );
};
