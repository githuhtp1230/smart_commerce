import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Props extends React.ComponentProps<"button"> {
  action: "increase" | "decrease";
  className?: string;
  iconClassName?: string;
}

const IconButton = ({
  icon: Icon,
  className,
  iconClassName,
  ...rest
}: {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}) => {
  return (
    <Button
      className={cn("border border-border-primary", className)}
      variant="outline"
      {...rest}
    >
      <Icon
        size={16}
        className={cn("icon text-icon-brand-primary", iconClassName)}
      />
    </Button>
  );
};

const QuantityButton = ({ action, iconClassName, ...rest }: Props) => {
  const icon = action === "increase" ? Plus : Minus;

  return <IconButton icon={icon} {...rest} iconClassName={iconClassName} />;
};

export default QuantityButton;
