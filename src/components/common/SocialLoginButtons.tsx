"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"button"> {
  prefixIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  text: string;
}

export default function SocialLoginButtons({
  prefixIcon: Icon,
  onClick,
  text,
  className,
  ...props
}: Props) {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div className="h-14 container">
      <Button
        className={cn(
          "w-full h-full flex items-center justify-center gap-4 border-2 border-border-primary shadow-none rounded-xl bg-transparent hover:bg-transparent",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {Icon && <Icon className="size-6" />}
        <span className="text-neutral-primary font-medium text-base">
          {text}
        </span>
      </Button>
    </div>
  );
}
