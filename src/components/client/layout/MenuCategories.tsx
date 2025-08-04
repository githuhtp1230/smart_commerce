import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PATH } from "@/constants/path";
import { fetchCategories } from "@/services/categories.service";
import { useQuery } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const MenuCategories = () => {
  const { t } = useTranslation();
  const { data } = useQuery({
    queryKey: ["categories"],
    refetchOnMount: false,
    queryFn: () => fetchCategories({ isDeleted: false, isFetchChildren: true }),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 !px-0 hover:bg-transparent"
        >
          <Menu />
          <p className="text-base">{t("Category")}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-0 w-168 bg-primary"
        side="bottom"
        align="start"
      >
        <div className="w-full grid grid-cols-3 p-5">
          {data?.map((category) => (
            <DropdownMenuGroup
              key={category.id}
              className="text-neutral-primary font-medium"
            >
              {category.name}
              <div className="mt-2">
                {category.children?.map((categoryChild) => (
                  <DropdownMenuItem
                    key={categoryChild.id}
                    asChild
                    className="cursor-pointer"
                  >
                    <Link
                      to={`${PATH.PRODUCTS}?categoryId=${categoryChild.id}`}
                    >
                      {categoryChild.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuGroup>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuCategories;
