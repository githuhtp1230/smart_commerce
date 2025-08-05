"use client";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const ToggleTheme = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "rounded-full cursor-pointer border-border-primary",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </Button>
  );
};

export default ToggleTheme;
