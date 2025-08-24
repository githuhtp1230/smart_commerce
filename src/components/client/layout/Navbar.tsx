import { PATH } from "@/constants/path";
import { NavLink } from "react-router-dom";
import MenuCategories from "./MenuCategories";
import { useTranslation } from "react-i18next";
const Navbar = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed top-[60px] z-20 w-full bg-background-secondary py-1 flex justify-center px-10">
      <div className="flex justify-between max-w-screen-xl w-full">
        <MenuCategories />
        <ul className="flex items-center gap-2">
          <NavLink className="text-base" to={PATH.HOME_PAGE}>
            {t("Home")}
          </NavLink>
          <NavLink className="text-base" to={PATH.PRODUCTS}>
            {t("Products")}
          </NavLink>
          <NavLink className="text-base" to={PATH.CONTACT}>
            {t("Contact")}
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
