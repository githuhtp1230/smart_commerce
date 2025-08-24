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
    <div className="p-6 bg-white dark:bg-background-primary rounded-xl shadow border border-gray-200/70 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <img
            src={user.avatar || "https://i.pravatar.cc/80"}
            alt="avatar"
            className="w-24 h-24 rounded-full border-2 border-blue-200 object-cover shadow-md mb-2 bg-white"
          />
        </div>

        {/* Name + Role */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex flex-col justify-center md:col-span-1">
            <h2 className="text-2xl font-bold text-txt-primary tracking-tight">
              {user.name}
            </h2>
            <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">
              {user.role}
            </span>
          </div>

          {/* Email + Phone */}
          <div className="flex flex-col justify-center md:col-span-1 text-sm text-txt-primary space-y-2">
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
          <div className="flex flex-col justify-center items-center md:items-end md:col-span-1">
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
    </div>
  );
}
