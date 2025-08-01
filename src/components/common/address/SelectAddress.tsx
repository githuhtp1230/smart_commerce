import { useAddress } from "@/components/client/profile/profile-helper/use-address";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  deleteAddress,
  updateDefaultAddress,
} from "@/services/address.service";
import { useAuthStore } from "@/store/auth-store";
import type { Address } from "@/type/auth";
import { useMutation } from "@tanstack/react-query";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";
import UpdateAddressDialog from "../dialog/UpdateAddressDialog";
import { toastSuccess } from "../sonner";

const SelectAddress = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { me, setMe } = useAuthStore((s) => s);
  const { selectedAddressId, setDefaultAddress } = useAddress(true);
  const [selectAddressToUpdate, setSelectAddressToUpdate] = useState<Address>();
  const addresses = me?.addresses;

  const { mutate: setDefaultAddressMutation } = useMutation({
    mutationFn: updateDefaultAddress,
    onSuccess: (_data, addressId) => {
      setDefaultAddress(addressId);
    },
  });

  const { mutate: deleteAddressMutation } = useMutation({
    mutationFn: deleteAddress,
    onSuccess: (_, deletedAddressId) => {
      const updatedAddress = me?.addresses?.filter(
        (addr) => addr.id != deletedAddressId
      );
      if (me) {
        setMe({
          ...me,
          addresses: updatedAddress,
        });
      }
      toastSuccess("Delete address successfully");
    },
  });

  return (
    <>
      <RadioGroup
        value={`${selectedAddressId()}`}
        onValueChange={(val) => {
          setDefaultAddressMutation(Number(val));
        }}
        className="mt-4"
      >
        {addresses?.map((address: Address) => {
          const location = `${address.streetAddress}, ${address.ward}, ${address.district}, ${address.province}`;
          return (
            <div
              key={address.id}
              className="flex items-center gap-2 hover:bg-background-secondary py-1 px-2 rounded-sm"
            >
              <RadioGroupItem
                value={`${address.id}`}
                className="focus:!ring-0 focus:!outline-0"
              />
              <p className="flex-1 text-sm">
                {location}
                {address.isDefault && (
                  <span className="ml-2 text-xs text-green-600">
                    (Mặc định)
                  </span>
                )}
              </p>
              <div className="flex">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-txt-brand"
                  onClick={() => {
                    setIsOpen(true);
                    setSelectAddressToUpdate(address);
                  }}
                >
                  <Pen className="w-4 h-4" />
                  Cập Nhật
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-txt-system-danger"
                  onClick={() => deleteAddressMutation(address.id)}
                >
                  <Trash className="w-4 h-4" />
                  Xoá Địa Chỉ
                </Button>
              </div>
            </div>
          );
        })}
      </RadioGroup>

      <UpdateAddressDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        address={selectAddressToUpdate}
      />
    </>
  );
};

export default SelectAddress;
