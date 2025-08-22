import { Eye, EyeOff } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface Props extends React.ComponentProps<"input"> {
  field?: React.InputHTMLAttributes<HTMLInputElement>;
  prefixIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  hasError?: boolean;
  isPassword?: boolean;
  containerClassName?: string;
}

const CustomInput = ({
  field,
  hasError = false,
  isPassword = false,
  prefixIcon: Icon,
  className,
  containerClassName,
  disabled,
  type,
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={cn(
        "px-4 py-0.5 flex items-center gap-2 rounded-lg border",
        hasError
          ? "border-icon-system-danger"
          : "border-border-primary focus-within:border-blue-400",
        disabled && "bg-background-secondary",
        containerClassName
      )}
    >
      {Icon && (
        <div className="size-5 flex items-center justify-center text-icon-tertiery">
          <Icon />
        </div>
      )}
      <Input
        disabled={disabled}
        type={
          isPassword ? (showPassword ? "text" : "password") : type && "text"
        }
        className={cn(
          "m-0 border-none bg-transparent dark:bg-transparent p-0 shadow-none focus-visible:ring-0 disabled:opacity-100",
          "font-normal text-sm text-left",
          className
        )}
        {...field}
        {...rest}
      />
      {isPassword && (
        <Button
          className="text-icon-tertiery w-4.5 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          variant="ghost"
        >
          {!showPassword ? (
            <Eye className="text-icon-tertiery size-5" />
          ) : (
            <EyeOff className="text-icon-tertiery size-5" />
          )}
        </Button>
      )}
    </div>
  );
};

export default CustomInput;
