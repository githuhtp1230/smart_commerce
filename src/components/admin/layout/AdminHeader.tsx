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
import { useTranslation } from "react-i18next";

const AdminHeader = () => {
  const { t } = useTranslation();

  return (
    <header className="flex h-16 items-center justify-between px-4 gap-4">
      {/* Bên trái: Sidebar và Breadcrumb */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                {t("Building Your Application")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("Data Fetching")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Bên phải: Language switcher */}
      <div className="flex items-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default AdminHeader;
