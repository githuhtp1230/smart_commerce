// components/AddressSelector.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { getMyAddresses, setDefaultAddress } from "@/services/address.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Address {
  id: string;
  streetAddress: string;
  ward: string;
  district: string;
  province: string;
  isDefault?: boolean; // boolean đúng với backend và DB
}

interface Props {
  selectedAddressId: string | null;
  onChange: (id: string) => void;
  onOpenAddNew: () => void;
}

const AddressSelector: React.FC<Props> = ({
  selectedAddressId,
  onChange,
  onOpenAddNew,
}) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: addresses } = useQuery({
    queryKey: ["myAddresses"],
    queryFn: getMyAddresses,
  });

  const { mutate: setDefaultAddressMutation } = useMutation({
    mutationFn: (id: string) => setDefaultAddress(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAddresses"] });
    },
  });

  const selectedAddress = addresses?.find(
    (a: Address) => a.id === selectedAddressId
  );

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Địa chỉ đang sử dụng</p>
          {selectedAddress ? (
            <p className="text-base font-medium mt-1">
              {selectedAddress.streetAddress}, {selectedAddress.ward},{" "}
              {selectedAddress.district}, {selectedAddress.province}
              {selectedAddress.isDefault && (
                <span className="ml-2 text-xs text-green-600">(Mặc định)</span>
              )}
            </p>
          ) : (
            <p className="text-base text-destructive mt-1">Chưa chọn địa chỉ</p>
          )}
        </div>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Thay đổi
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chọn địa chỉ giao hàng</DialogTitle>
          </DialogHeader>
          <Separator />
          <RadioGroup
            value={selectedAddressId ?? ""}
            onValueChange={(val) => {
              setDefaultAddressMutation(val); // gọi API để set mặc định
              onChange(val); // callback về parent
              setOpen(false); // đóng dialog
            }}
            className="space-y-4 mt-4"
          >
            {addresses?.map((address: Address) => (
              <div key={address.id} className="flex items-start gap-2">
                <RadioGroupItem value={address.id} />
                <div>
                  <p className="text-sm">
                    {address.streetAddress}, {address.ward}, {address.district},{" "}
                    {address.province}
                    {address.isDefault && (
                      <span className="ml-2 text-xs text-green-600">(Mặc định)</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>

          <DialogFooter className="mt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                onOpenAddNew();
              }}
              className="flex items-center gap-2 text-blue-500"
            >
              <Plus className="w-4 h-4" />
              Thêm địa chỉ mới
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddressSelector;
