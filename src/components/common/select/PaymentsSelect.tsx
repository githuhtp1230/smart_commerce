import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { fetchPayments } from "@/services/payment.service";
import { useQuery } from "@tanstack/react-query";
import type { ControllerRenderProps } from "react-hook-form";

interface Props {
  field: ControllerRenderProps<
    {
      addressId: number;
      paymentId: number;
    },
    "paymentId"
  >;
  hasError?: boolean;
}

const PaymentsSelect = ({ field, hasError }: Props) => {
  const { data } = useQuery({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });

  return (
    <Select
      onValueChange={(value) => {
        field?.onChange?.(Number(value));
      }}
    >
      <SelectTrigger
        className={cn(
          "w-full !bg-transparent focus:!ring-0",
          hasError && "border-system-danger-hard"
        )}
      >
        <SelectValue placeholder="Select a payment" />
      </SelectTrigger>
      <SelectContent className="bg-primary">
        {data?.map((payment) => (
          <SelectItem key={payment.id} value={`${payment.id}`}>
            {payment.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PaymentsSelect;
