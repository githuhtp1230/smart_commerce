import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ADMIN_PATH, PATH } from "@/constants/path";
import { useAuthStore } from "@/store/auth-store";
import { LogOutIcon, User, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import CircleAvatar from "./CircleAvatar";
import RequireRole from "../../require-role";
import { useTranslation } from "react-i18next";

export default function AvatarDropdown() {
  const { me, logout } = useAuthStore((state) => state);
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <CircleAvatar isMe />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="mt-2 w-72 bg-primary"
        align="end"
        alignOffset={-10}
      >
        <DropdownMenuItem disabled={true} className="py-2 !opacity-100">
          <CircleAvatar isMe />
          <div className="ml-1 flex flex-col">
            <p className="text-sm font-medium">{me?.name}</p>
            <p className="text-sm text-muted-foreground">{me?.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            to={PATH.PROFILE}
            className="flex items-center gap-2 cursor-pointer"
          >
            <User className="w-4 h-4" />{" "}
            <span className="text-sm text-txt-secondary">{t("profile")}</span>
          </Link>
        </DropdownMenuItem>
        <RequireRole roles={["ADMIN"]}>
          <DropdownMenuItem asChild>
            <Link
              to={ADMIN_PATH.PRODUCT}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4" />{" "}
              <span className="text-sm text-txt-secondary">{t("manager")}</span>
            </Link>
          </DropdownMenuItem>
        </RequireRole>
        <DropdownMenuSeparator />
        <div className="p-2">
          <DropdownMenuItem asChild>
            <Button
              className="text-txt-secondary bg-background border border-border-primary w-full cursor-pointer focus:!ring-0"
              onClick={logout}
            >
              <LogOutIcon className="text-txt-system-danger" />
              <p className="text-sm">{t("signout")}</p>
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
