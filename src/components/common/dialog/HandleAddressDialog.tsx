import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { createAddress } from "@/services/address.service";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, Plus } from "lucide-react";
import { useState } from "react";
import AddressField from "../address/AddressFields";
import SelectAddress from "../address/SelectAddress";
import { toastError, toastSuccess } from "../sonner";
import { useTranslation } from "react-i18next";

export type AddressView = "dashboard" | "select-address";

interface Props {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

const HandleAddressDialog = ({ isOpen, onOpenChange }: Props) => {
  const { t } = useTranslation();
  const [view, setView] = useState<AddressView>("dashboard");

  const { mutate: createNewAddress } = useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      setView("dashboard");
      toastSuccess("Add address successfully");
    },
    onError: () => {
      toastError("Failed to add address");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={cn("min-w-xl")}>
        {view === "dashboard" ? (
          <div>
            <DialogTitle>{t("Select address")}</DialogTitle>
            <SelectAddress />
            <div className="flex justify-end">
              <Button
                variant="ghost"
                className="text-txt-brand hover:text-txt-brand hover:bg-background-surface"
                onClick={() => {
                  setView("select-address");
                }}
              >
                <Plus />
                {t("Add address")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <DialogTitle className="flex gap-2 items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-txt-primary"
                onClick={() => {
                  setView("dashboard");
                }}
              >
                <ChevronLeft className="size-5" />
              </Button>
              <p>{t("Add address")}</p>
            </DialogTitle>

            <AddressField
              onSelectedAddress={createNewAddress}
              saveButtonContent="Thêm"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HandleAddressDialog;
