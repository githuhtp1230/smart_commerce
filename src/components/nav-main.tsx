"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useLocation, NavLink } from "react-router-dom";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    type?: "sidebar-tab" | "sidebar-dropdown";
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  const location = useLocation();

  return (
    <SidebarGroup className="overflow-auto scrollbar-hide">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (!item.items || item.items.length === 0) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      cn(
                        "flex rounded-sm px-2 gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground py-1",
                        isActive && "!text-white !bg-[#3266F6]"
                      )
                    }
                  >
                    {item.icon && <item.icon />}
                    <span className="text-base">{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={location.pathname.startsWith(item.url)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex rounded-sm px-2 gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground py-1",
                          isActive && "!text-white !bg-[#3266F6]"
                        )
                      }
                    >
                      {item.icon && <item.icon />}
                      <span className="text-base">{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </NavLink>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <NavLink
                          to={subItem.url}
                          className={({ isActive }) =>
                            cn(
                              "flex rounded-sm px-2 gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground py-1",
                              isActive && "!text-white !bg-[#3266F6]"
                            )
                          }
                        >
                          {subItem.icon && (
                            <subItem.icon className="text-current w-4" />
                          )}
                          <span className="text-base">{subItem.title}</span>
                        </NavLink>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
