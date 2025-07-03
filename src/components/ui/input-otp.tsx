// src/components/ui/input-otp.tsx
import React from "react";
import { cn } from "@/lib/utils"; // nếu có utils cn để merge className

// InputOTP: container chính
export const InputOTP: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex gap-2 items-center justify-center", className)}
      {...props}
    >
      {children}
    </div>
  );
};

// InputOTPGroup: nhóm các slot (ví dụ nhóm 2 slot)
export const InputOTPGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      {children}
    </div>
  );
};

// InputOTPSeparator: dấu gạch ngang giữa các group
export const InputOTPSeparator: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
  return (
    <span className={cn("text-xl font-bold", className)} {...props}>
      -
    </span>
  );
};

// InputOTPSlot: từng ô input
export const InputOTPSlot: React.FC<{
  index: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ index, value = "", onChange }) => {
  return (
    <input
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={onChange}
      className="w-10 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};