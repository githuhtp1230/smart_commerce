"use client";
import React from "react";
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
import ToggleTheme from "@/components/common/ToggleTheme";
import { data } from "@/components/app-sidebar";
import { Link, useLocation } from "react-router-dom";

const AdminHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const normalize = (url: string) => (url.startsWith("/") ? url : `/${url}`);

  const findBreadcrumb = () => {
    for (const main of data.navMain) {
      if (pathname === normalize(main.url)) {
        return [main.title];
      }
      if (main.items) {
        const found = main.items.find((item) => pathname === normalize(item.url));
        if (found) {
          return [main.title, found.title];
        }
      }
    }
    return [];
  };

  const crumbs = findBreadcrumb();
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
            {crumbs.map((c, idx) => (
              <React.Fragment key={idx}>
                <BreadcrumbItem className="hidden md:block">
                  {idx === crumbs.length - 1 ? (
                    <BreadcrumbPage className="text-white">{c}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to="#" className="text-white">
                        {c}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {idx < crumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
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
