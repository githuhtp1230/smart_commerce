import React, { Fragment } from "react";
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
  const handleChange = (index: number, digit: string) => {
    const newValue =
      value.substring(0, index) + digit + value.substring(index + 1);
    onChange(newValue);
  };

  return (
    <InputOTP>
      {[0, 2, 4].map((startIndex, groupIdx) => (
        <Fragment key={groupIdx}>
          <InputOTPGroup>
            <InputOTPSlot
              index={startIndex}
              value={value[startIndex] || ""}
              onChange={(e) => handleChange(startIndex, e.target.value)}
            />
            <InputOTPSlot
              index={startIndex + 1}
              value={value[startIndex + 1] || ""}
              onChange={(e) => handleChange(startIndex + 1, e.target.value)}
            />
          </InputOTPGroup>
          {groupIdx < 2 && <InputOTPSeparator />}
        </Fragment>
      ))}
    </InputOTP>
  );
};

export default OTPInputWithSeparator;
