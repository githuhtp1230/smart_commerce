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
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

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
      <SidebarMenu  >
        {items.map((item) => {
          if (item.type === "sidebar-tab") {
            return (
              <SidebarMenuItem >
                <SidebarMenuButton>
                  <Link to={item.url} >
                    {item.icon && <item.icon
                    />}
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
                className="group /collapsible "
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}
                      className=" hover:!text-white hover:!bg-[#3266F6] focus:!bg-[#3266F6] focus:!text-white">
                      {item.icon && <item.icon />}
                      <span className="text-base">{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className="px-2 py-4 rounded                                         
                                        hover:font-medium hover:[&>svg]:font-medium hover:!text-white hover:[&>svg]:!text-white
                                        hover:bg-[#3266F6]
                                        focus:font-medium focus:[&>svg]:font-medium focus:!text-white focus:[&>svg]:!text-white
                                        focus:!bg-[#3266F6]
                                        ">
                            <Link to={subItem.url} className="flex items-center gap-2">
                              {subItem.icon && <subItem.icon className="text-current" />}
                              <span className="text-base">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>

              </Collapsible>
            );
        })}
      </SidebarMenu >
    </SidebarGroup >
  );
}
