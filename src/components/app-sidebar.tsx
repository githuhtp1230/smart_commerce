import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ClipboardList,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  MonitorSmartphone,
  PieChart,
  Puzzle,
  Settings2,
  TicketPercent,
  Truck,
  UserLock,
  UsersRound,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
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
        {
          title: "Attribute value detail",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
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
          url: "#",
        },
        {
          title: "vouchers",
          url: "#",
        },
        {
          title: "Attribute value detail",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Manage order",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "Attribute",
          url: "#",
        },
        {
          title: "Attribute value",
          url: "#",
        },
        {
          title: "Attribute value detail",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Manage review",
      url: "#",
      icon: ClipboardList,
      items: [
        {
          title: "Attribute",
          url: "#",
        },
        {
          title: "Attribute value",
          url: "#",
        },
        {
          title: "Attribute value detail",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Manage permission",
      url: "#",
      icon: UserLock,
      items: [
        {
          title: "Attribute",
          url: "#",
        },
        {
          title: "Attribute value",
          url: "#",
        },
        {
          title: "Attribute value detail",
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
  ],
  projects: [],
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
            "flex justify-between items-center bg-background-primary",
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
