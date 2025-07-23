import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  MonitorSmartphone,
  PieChart,
  Settings2,
  SquareTerminal,
  UsersRound,
} from "lucide-react";
import { useEffect } from "react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { ADMIN_PATH } from "@/constants/path";
import SwitchCustomizationDemo from "./customized/switch/switch-07";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const data = {
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
      title: "Manage Products",
      url: "#",
      icon: MonitorSmartphone,
      isActive: true,
      items: [
        {
          title: "Products",
          url: ADMIN_PATH.PRODUCT,
        },
        {
          title: "Add products",
          url: ADMIN_PATH.ADD_PRODUCT,
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
        },
        {
          title: "Subcategory",
          url: ADMIN_PATH.SUBCATEGORY,
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Manage Users",
      url: "#",
      icon: UsersRound,
      items: [
        {
          title: "Users",
          url: ADMIN_PATH.USER,
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
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
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      type: "sidebar-tab",
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setTheme, theme } = useTheme();
  const { open } = useSidebar();
  const { me } = useAuthStore();
  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <Sidebar
      className="[&_[data-sidebar='sidebar']]:bg-primary side"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <NavUser user={me} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <div
          className={cn(
            "flex justify-between items-center bg-background",
            open ? "" : "hidden"
          )}
        >
          <p>Theme mode</p>
          <SwitchCustomizationDemo
            onCheckedChange={handleCheckedChange}
            checked={theme === "dark"}
          />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
