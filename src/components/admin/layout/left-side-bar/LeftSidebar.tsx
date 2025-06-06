import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ADMIN_PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import { Box } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="bg-primary">
          <SidebarGroup>
            <SidebarGroupLabel>Admin manager</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={ADMIN_PATH.PRODUCT}>
                      <Box />
                      <span>Products</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={ADMIN_PATH.CATEGORY}>
                      <Box />
                      <span>Categories</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default LeftSidebar;
