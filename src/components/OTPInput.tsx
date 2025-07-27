import React, { Fragment, useRef } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const OTPInputWithSeparator: React.FC<OTPInputProps> = ({
  value,
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (index: number, digit: string) => {
    const newValue =
      value.substring(0, index) + digit + value.substring(index + 1);
    onChange(newValue);

    if (digit && containerRef.current) {
      const inputs = containerRef.current.querySelectorAll("input");
      const nextInput = inputs[index + 1] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div ref={containerRef}>
      <InputOTP>
        {[0, 2, 4].map((startIndex, groupIdx) => (
          <Fragment key={groupIdx}>
            <InputOTPGroup>
              {[0, 1].map((offset) => {
                const index = startIndex + offset;
                return (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    value={value[index] || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                );
              })}
            </InputOTPGroup>
            {groupIdx < 2 && <InputOTPSeparator />}
          </Fragment>
        ))}
      </InputOTP>
    </div>
  );
};

export default OTPInputWithSeparator;
