import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

interface Props extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  className?: string;
  value: string;
}

const CustomTabsTrigger = ({ className, value, ...props }: Props) => {
  return (
    <TabsTrigger
      value={value}
      {...props}
      className={cn(
        "bg-background py-2 rounded-none text-txt-secondary h-9 p-5 border-b-3 border-b-transparent",
        "hover:text-blue-400 hover:border-border-primary",
        "data-[state=active]:text-blue-500 border-t-0 border-r-0 border-l-0 data-[state=active]:!border-blue-500 data-[state=active]:!border-b-3  data-[state=active]:shadow-none data-[state=active]:!bg-background ",
        className
      )}
    ></TabsTrigger>
  );
};

export default CustomTabsTrigger;
