"use client";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full cursor-pointer border-border-primary"
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
