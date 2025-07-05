import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { icons, type LucideIcon } from "lucide-react";

interface Props extends React.ComponentProps<"button"> {
  variant: "outline" | "default";
  message: string;
  className?: string;
  icon?: LucideIcon;
}

const PurchaseButton = ({
  variant,
  message,
  className,
  icon: Icon,
  ...rest
}: Props) => {
  return (
    <Button
      variant={variant}
      className={cn(
        "flex justify-center items-center font-normal min-w-35 min-h-12 text-sm",
        variant === "default"
          ? "bg-orange-600 hover:bg-orange-600 text-white"
          : "bg-orange-50 hover:bg-orange-50 text-orange-600 border border-orange-600 dark:border-orange-600/85 hover:text-orange-600",
        className
      )}
      {...rest}
    >
      {Icon && <Icon className="icon" />}
      {message}
    </Button>
  );
};

export default PurchaseButton;
