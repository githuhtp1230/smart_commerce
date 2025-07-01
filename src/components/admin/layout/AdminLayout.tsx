import AvatarStore from "@/components/common/avatar/AvatarStore";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ADMIN_PATH } from "@/constants/path";
import { useAuthStore } from "@/store/auth-store";
import { Box } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@radix-ui/react-separator";
import { AppSidebar } from "@/components/app-sidebar";
import AdminHeader from "./AdminHeader";
import { useEffect } from "react";

const AdminLayout = () => {
  const { me } = useAuthStore((s) => s);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
