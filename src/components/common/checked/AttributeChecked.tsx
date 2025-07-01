import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  checked?: boolean;
  onCheckedChanged?: (value: boolean) => void;
  name: string;
  className?: string;
}

const AttributeChecked = ({
  checked,
  onCheckedChanged,
  name,
  className,
  ...rest
}: Props) => {
  const [checkedLocal, setCheckedLocal] = useState<boolean>(false);

  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : checkedLocal;

  const handleChecked = () => {
    if (!isControlled) {
      setCheckedLocal((prev) => !prev);
    }
    onCheckedChanged?.(!currentChecked);
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "box-content h-auto hover:border-blue-500 hover:text-blue-600 rounded-sm relative px-5 py-2.5 overflow-hidden",
        currentChecked && "border-blue-500 text-blue-600 pointer-events-none",
        className
      )}
      onClick={handleChecked}
      {...rest}
    >
      {name}
      {currentChecked && (
        <div className="absolute top-0 -right-[1px] w-8 h-8 clip-triangle bg-blue-500 text-white flex items-center justify-center">
          <Check className="absolute -top-1 right-0 !w-[10px]" />
        </div>
      )}
    </Button>
  );
};

export default AttributeChecked;
