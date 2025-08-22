import { Mail, Phone } from "lucide-react";
import type { IUser } from "@/type/auth";
import { AppBadge } from "@/components/common/badge/AppBadge";
import { useTranslation } from "react-i18next";

interface ProfileInfoProps {
  user: IUser;
}

export default function ProfileUser({ user }: ProfileInfoProps) {
  const { t } = useTranslation();
  return (
    <div className="p-6 bg-background-primary rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
      <div className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-4 md:gap-6">
        {/* Avatar */}
        <div className="flex justify-center items-center">
          <img
            src={user.avatar || "https://i.pravatar.cc/80"}
            alt="avatar"
            className="w-20 h-20 rounded-full border-4 object-cover shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Name + Role */}
        <div className="flex flex-col justify-center px-4">
          <h2 className="text-2xl font-bold text-txt-primary tracking-tight">
            {user.name}
          </h2>
          <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">
            {user.role}
          </span>
        </div>

        {/* Email + Phone */}
        <div className="flex flex-col justify-center px-4 text-sm text-txt-primary space-y-2">
          <div className="flex items-center gap-3 transition-colors">
            <Mail className="h-5 w-5 text-blue-500" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 transition-colors">
            <Phone className="h-5 w-5 text-blue-500" />
            <span>{user.phone}</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col justify-center px-4">
          <span className="text-sm text-txt-primary mb-2 font-semibold tracking-wide">
            {t("User Status")}
          </span>
          <AppBadge
            badgeColor={user.isActive ? "emerald" : "red"}
            content={user.isActive ? t("Active") : t("Locked")}
          />
        </div>
      </div>
    </div>
  );
}
