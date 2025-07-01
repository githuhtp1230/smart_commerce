import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Props extends React.ComponentProps<"button"> {
  action: "increase" | "decrease";
  className?: string;
}

const IconButton = ({
  icon: Icon,
  className,
  ...rest
}: {
  icon: LucideIcon;
  className?: string;
}) => {
  return (
    <Button
      className={cn("border border-border-primary", className)}
      variant="outline"
      {...rest}
    >
      <Icon size={16} className="icon text-icon-brand-primary" />
    </Button>
  );
};

const QuantityButton = ({ action, ...rest }: Props) => {
  const icon = action === "increase" ? Plus : Minus;

  return <IconButton icon={icon} {...rest} />;
};

export default QuantityButton;
