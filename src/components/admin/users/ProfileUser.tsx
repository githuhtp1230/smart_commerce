import { Mail, Phone } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { IUser } from "@/type/auth";

interface ProfileInfoProps {
  user: IUser;
}

export default function ProfileUser({ user }: ProfileInfoProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar || "https://i.pravatar.cc/80"}
          alt="avatar"
          className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
        />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <Select defaultValue={user.isActive ? "active" : "locked"}>
              <SelectTrigger className="w-[140px] h-7 rounded-full border border-gray-300 text-xs">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">
                  <span className="flex items-center gap-1 text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Hoạt động
                  </span>
                </SelectItem>
                <SelectItem value="locked">
                  <span className="flex items-center gap-1 text-red-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Đã khóa
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{user.phone}</span>
          </div>
          <div className="text-sm text-gray-500">Role: {user.role}</div>
        </div>
      </div>
    </div>
  );
}
