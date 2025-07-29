
import { TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import React from 'react'
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
                "py-2 rounded-none text-txt-secondary h-9 p-5",
                "hover:border-b-border-primary hover:border-b-2 hover:bg-background-lightgray-secondary dark:hover:bg-background-gray",
                "data-[state=active]:text-txt-primary-blue data-[state=active]:border-b-blue-600 data-[state=active]:border-b-2 data-[state=active]:shadow-none data-[state=active]:bg-background-lightgray",
                "dark:bg-background-primary dark:data-[state=active]:border-b-blue-600 dark:data-[state=active]:border-t-0 dark:data-[state=active]:border-r-0 dark:data-[state=active]:border-l-0 dark:data-[state=active]:bg-background-lightgray",
                className
            )}
        ></TabsTrigger>
    )
}

export default CustomTabsTrigger