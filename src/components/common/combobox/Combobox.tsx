import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface IOption {
  value: number;
  name: string;
}

interface Props {
  field: React.SelectHTMLAttributes<HTMLSelectElement>;
  value: string;
  onChange: (IOptio: IOption) => void;
  options: IOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
}

const Combobox = ({
  field,
  // value,
  onChange,
  options,
  placeholder,
  disabled = false,
  hasError = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = (option: IOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "justify-between border-border-primary",
            !field.value && "text-muted-foreground",
            hasError && "border-system-danger-hard"
          )}
          disabled={disabled}
        >
          {field.value
            ? options.find((option) => option.name === field.value)?.name
            : placeholder || "Select option"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="bg-primary">
          <CommandInput placeholder="Search option..." className="h-9" />
          <CommandList>
            <CommandEmpty>No option found</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  value={option.name}
                  key={option.value}
                  onSelect={() => handleClick(option)}
                >
                  {option.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      option.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
