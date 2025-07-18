import { Logo } from "@/assets/icons";
import AvatarDropdown from "@/components/common/avatar/AvatarDropdown";
import CircleAvatar from "@/components/common/avatar/CircleAvatar";
import ToggleTheme from "@/components/common/ToggleTheme";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { PATH } from "@/constants/path";
import { useAuthStore } from "@/store/auth-store";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { MailIcon, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import CartIcon from "../../common/cart/CartIcon";

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="flex justify-center w-full items-center py-3 px-10">
      <div className="max-w-screen-xl flex justify-between w-full items-center">
        <div className="flex gap-1 items-center leading-none">
          <Logo className="size-9 " />
          <p className="font-medium text-lg text-txt-blue">MART COMMERCE</p>
        </div>
        <div className="flex items-center rounded-4xl border border-border-primary focus-within:ring-1 focus-within:ring-ring pl-4 w-150 bg-primary">
          <MailIcon className="h-5 w-5 text-muted-foreground bg-primary" />
          <Input
            type="email"
            placeholder="Email"
            className="border-0 focus-visible:ring-0 shadow-none rounded-4xl !bg-primary"
          />
        </div>
        <div className="flex gap-3 items-center">
          <ToggleTheme />
          <Link to={PATH.CART}>
            <CartIcon />
          </Link>
          {isAuthenticated ? (
            <Link to={PATH.PROFILE}>
              <AvatarDropdown />
            </Link>
          ) : (
            <Link to={PATH.LOGIN} className="text-base">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
