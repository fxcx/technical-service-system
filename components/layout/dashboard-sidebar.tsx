"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Wrench,
  Users,
  Calendar,
  CreditCard,
  FileText,
  UserCircle,
  LogOut,
  ClipboardList,
} from "lucide-react";
import type { SessionUser } from "@/types";

interface DashboardSidebarProps {
  user: SessionUser;
}

const adminNavItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Servicios", href: "/admin/services", icon: Wrench },
  { title: "Agenda", href: "/admin/schedule", icon: Calendar },
  { title: "Clientes", href: "/admin/clients", icon: Users },
  { title: "Técnicos", href: "/admin/technicians", icon: UserCircle },
  { title: "Cobros", href: "/admin/payments", icon: CreditCard },
];

const technicianNavItems = [
  { title: "Mi Agenda", href: "/technician/dashboard", icon: LayoutDashboard },
  { title: "Calendario", href: "/technician/schedule", icon: Calendar },
  { title: "Mis Servicios", href: "/technician/services", icon: ClipboardList },
];

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const navItems = user.role === "ADMIN" ? adminNavItems : technicianNavItems;

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link
          href={
            user.role === "ADMIN" ? "/admin/dashboard" : "/technician/dashboard"
          }
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Wrench className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sidebar-foreground">
              TechService
            </span>
            <span className="text-xs text-sidebar-foreground/60">
              {user.role === "ADMIN" ? "Administración" : "Panel Técnico"}
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                    }
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-sm font-medium text-sidebar-foreground">
              {user.name}
            </span>
            <span className="truncate text-xs text-sidebar-foreground/60">
              {user.email}
            </span>
          </div>
          <LogoutButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md p-2 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
      title="Cerrar sesión"
    >
      <LogOut className="h-4 w-4" />
    </button>
  );
}
