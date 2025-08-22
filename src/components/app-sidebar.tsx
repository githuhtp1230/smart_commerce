import * as React from "react";
import {
  AudioWaveform,
  Bot,
  ClipboardList,
  Command,
  GalleryVerticalEnd,
  MonitorSmartphone,
  Puzzle,
  Settings2,
  TicketPercent,
  Truck,
  UserLock,
  PackagePlus,
  Boxes,
  Layers,
  FileStack,
  UserCog,
  Users,
  BadgePercent,
  LayoutDashboard,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { ADMIN_PATH } from "@/constants/path";
import { Logo } from "@/assets/icons";

export const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Manage Products",
      url: "#",
      icon: MonitorSmartphone,
      isActive: true,
      items: [
        {
          title: "Products",
          url: ADMIN_PATH.PRODUCT,
          icon: Boxes,
        },
        {
          title: "Add products",
          url: ADMIN_PATH.ADD_PRODUCT,
          icon: PackagePlus,
        },
      ],
    },
    {
      title: "Manage Categories",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Parent Category",
          url: ADMIN_PATH.CATEGORY,
          icon: Layers,
        },
        {
          title: "Subcategory",
          url: ADMIN_PATH.SUBCATEGORY,
          icon: FileStack,
        },
      ],
    },
    {
      title: "Manage Users",
      url: "#",
      icon: UserCog,
      items: [
        {
          title: "Users",
          url: ADMIN_PATH.USER,
          icon: Users,
        },
      ],
    },
    {
      title: "Manage Attribute",
      url: "#",
      icon: Puzzle,
      items: [
        {
          title: "Attribute",
          url: ADMIN_PATH.ATTRIBUTE,
        },
        {
          title: "Attribute value",
          url: ADMIN_PATH.ATTRIBUTEVALUE,
        },
      ],
    },
    {
      title: "Manage promotion",
      url: "#",
      icon: TicketPercent,
      items: [
        {
          title: "promotion",
          url: ADMIN_PATH.PROMOTION,
          icon: BadgePercent,
        },
      ],
    },
    {
      title: "Manage order",
      url: "#",
      icon: Truck,
    },
    {
      title: "Manage review",
      url: "#",
      icon: ClipboardList,
    },
    {
      title: "Manage permission",
      url: "#",
      icon: UserLock,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar
      className="[&_[data-sidebar='sidebar']]:bg-primary side "
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex gap-1 items-center leading-none mt-2 mb-2">
          <Logo className="size-8 " />
          {open && (
            <p className="font-medium text-lg text-txt-blue">MART COMMERCE</p>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
