import { Dialog, DialogContent } from "@/components/ui/dialog";
import { updateAddressService } from "@/services/address.service";
import type { Address } from "@/type/auth";
import { useMutation } from "@tanstack/react-query";
import AddressField from "../address/AddressFields";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toastSuccess } from "../sonner";
import { useAuthStore } from "@/store/auth-store";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  address: Address | undefined;
}

const UpdateAddressDialog = ({ isOpen, onOpenChange, address }: Props) => {
  const { t } = useTranslation();
  const { me, setMe } = useAuthStore((s) => s);
  const { mutate: updateAddress } = useMutation({
    mutationFn: updateAddressService,
    onSuccess(data, address) {
      const updatedAddress = me?.addresses?.map((addr) => {
        if (address.id === addr.id) {
          return { ...address } as Address;
        }
        return addr;
      });
      if (me && updatedAddress) {
        console.log(updatedAddress);
        setMe({
          ...me,
          addresses: updatedAddress,
        });
      }
      onOpenChange(false);
      toastSuccess("Updated address successfully");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xl">
        <DialogTitle>{t("Edit address")}</DialogTitle>
        <AddressField
          onSelectedAddress={updateAddress}
          saveButtonContent="Update"
          defaultValue={address}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddressDialog;
