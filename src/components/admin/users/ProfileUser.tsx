import { Mail, Phone, CheckCircle, Lock } from "lucide-react";
import type { IUser } from "@/type/auth";

interface ProfileInfoProps {
  user: IUser;
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  const baseClass =
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
  return isActive ? (
    <div className={`${baseClass} bg-green-50 text-green-900`}>
      <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
      Hoạt động
    </div>
  ) : (
    <div className={`${baseClass} bg-red-300 text-red-900`}>
      <Lock className="h-4 w-4 text-red-600 mr-1" />
      Đã khóa
    </div>
  );
}

export default function ProfileUser({ user }: ProfileInfoProps) {
  return (
    <div className="p-6 bg-background-primary rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
      <div className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-4 md:gap-6">
        {/* Avatar */}
        <div className="flex justify-center items-center">
          <img
            src={user.avatar || "https://i.pravatar.cc/80"}
            alt="avatar"
            className="w-20 h-20 rounded-full border-4  object-cover shadow-md transition-transform duration-300 hover:scale-105"
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
            Trạng thái
          </span>
          <StatusBadge isActive={user.isActive} />
        </div>
      </div>
    </div>
  );
}
