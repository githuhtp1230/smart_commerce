"use client";

import LanguageSwitcher from "@/components/common/language/LanguageSwitcher";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { NavUser } from "@/components/nav-user";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import ToggleTheme from "@/components/common/ToggleTheme";

const AdminHeader = () => {
  const { setTheme, theme } = useTheme();

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12  w-full d-flex justify-between mb-10 bg-[#3266F6]">
      <div className="flex items-center justify-between gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-white" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 "
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#" className="text-white">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block " />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">
                Data Fetching
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>



      <div className="flex items-center gap-2 mr-2">
        <div className={cn("flex justify-between items-center text-white gap-2")}>
          <ToggleTheme className="text-white bg-transparent hover:bg-transparent hover:text-white border border-border-primary" />
          <LanguageSwitcher />
        </div>
        <div className="pl-4 border-l border-white">
          <NavUser />
        </div>
      </div>


    </header>
  );
};

export default AdminHeader;
