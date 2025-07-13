import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { fetchPayments } from "@/services/payment.service";
import { Label } from "@radix-ui/react-select";

const PaymentsSelect = () => {
  const { data } = useQuery({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });
  return (
    <Select>
      <SelectTrigger className="w-full !bg-transparent focus:!ring-0">
        <SelectValue placeholder="Select a payment" />
      </SelectTrigger>
      <SelectContent className="bg-primary">
        {data?.map((payment) => (
          <SelectItem value={payment.value}>{payment.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PaymentsSelect;
