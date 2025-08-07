"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

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
import { NavLink, Link } from "react-router-dom";

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
  return (
    <SidebarGroup className="overflow-auto scrollbar-hide">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.type === "sidebar-tab") {
            return (
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span className="text-base ">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          } else
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible "
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className="text-txt-secondary text-sm font-medium">
                      {item.icon && <item.icon />}
                      <span className="text-base">{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
                                "flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-txt-secondary transition-colors duration-200 ease-in-out ",
                                isActive
                                  ? "bg-background-blue text-white shadow-md"
                                  : "hover:bg-[#2B7FFF] hover:text-white "
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
