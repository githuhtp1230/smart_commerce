import React from "react";
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
import SwitchCustomizationDemo from "@/components/customized/switch/switch-07";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path"
import ToggleTheme from "@/components/common/ToggleTheme";

const AdminHeader = () => {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12  w-full d-flex justify-between mb-10 bg-gradient-to-l from-[#1382de] via-[#1D8FE1] to-[#625EB1]">
      <div className="flex items-center justify-between gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-txt-muted" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 "
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#" className="text-txt-primary-light">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block " />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-txt-muted">
                Data Fetching
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4 mr-2">
        <div
          className={cn(
            "flex justify-between items-center text-background-blue",
          )}
        >
          <ToggleTheme className="text-white bg-transparent hover:bg-transparent hover:text-white border border-border-primary" />

        </div>
        <button
          onClick={() => navigate(PATH.HOME_PAGE)}
        >
          <House className="w-5 h-5 text-txt-muted" />
        </button>
        <div className="pl-4 border-l ">
          <NavUser />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
