import ToggleTheme from "@/components/modules/ToggleTheme";
import { Input } from "@/components/ui/input";
import { PATH } from "@/constants/path";
import { MailIcon, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-center w-full items-center py-3">
      <div className="max-w-screen-xl flex justify-between w-full items-center">
        <div>Logo</div>
        <div className="flex items-center rounded-4xl border border-border-primary focus-within:ring-1 focus-within:ring-ring pl-4 w-150 bg-primary">
          <MailIcon className="h-5 w-5 text-muted-foreground bg-primary" />
          <Input
            type="email"
            placeholder="Email"
            className="border-0 focus-visible:ring-0 shadow-none rounded-4xl !bg-primary"
          />
        </div>
        <div className="flex gap-2 items-center">
          <ToggleTheme />
          <Link to={PATH.CART}>
            <ShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
