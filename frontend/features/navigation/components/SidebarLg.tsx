"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

interface SidebarLgProps {
  navItems: { label: string; href: string; icon: JSX.Element }[];
  pathname: string;
  onLogout: () => void;

  currentUserId?: string | null;
}

export function SidebarLg({ navItems, onLogout }: SidebarLgProps) {
  const pathname = usePathname() ?? "";
  return (
    <>
      <div className="hidden lg:block">
        <SidebarProvider>
          <Sidebar>
            <SidebarContent className="mt-8 flex flex-col gap-4">
              <SidebarMenu className="mt-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith(item.href)}
                      size="lg"
                    >
                      <Link
                        key={item.href}
                        href={item.href}
                        className="pl-4 rounded-md"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="px-3 pb-3 flex flex-col gap-2">
              <Button
                variant="ghost"
                className="flex justify-start gap-2 w-fit pr-5"
                onClick={onLogout}
              >
                <ChevronLeftIcon className="" />
                Logout
              </Button>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </div>
    </>
  );
}
