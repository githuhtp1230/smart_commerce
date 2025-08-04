"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeIcon, CheckIcon } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lang: "en" | "vi") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  const languages = [
    { code: "en", label: "English", icon: "🇺🇸" },
    { code: "vi", label: "Tiếng Việt", icon: "🇻🇳" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <GlobeIcon className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLang === "en" ? "English" : "Tiếng Việt"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code as "en" | "vi")}
            className="flex justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <span>{lang.icon}</span>
              <span>{lang.label}</span>
            </div>
            {currentLang === lang.code && (
              <CheckIcon className="h-4 w-4 text-green-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
