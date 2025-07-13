import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AddressSelectProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ id: string; name: string }>;
  placeholder: string;
  disabled: boolean;
}

const AddressSelect: React.FC<AddressSelectProps> = ({
  id,
  label,
  value = "",
  onValueChange,
  options = [],
  placeholder = "Chọn một tùy chọn",
  disabled = false,
}) => {
  // Log props for debugging
  console.log(`AddressSelect [${id}]:`, { value, options });

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label || "Không có nhãn"}</Label>
      <Select
        value={value || ""}
        onValueChange={onValueChange || (() => {})}
        disabled={disabled}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(options) && options.length > 0 ? (
            options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name || "Không có tên"}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="" disabled>
              Không có tùy chọn
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AddressSelect;
