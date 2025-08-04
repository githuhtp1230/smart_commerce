import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { updateProfile } from "@/services/me.service";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import HandleAddressDialog from "@/components/common/dialog/HandleAddressDialog";
import { toastError } from "@/components/common/sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddress } from "./profile-helper/use-address";

interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}

const formSchema = z.object({
  phone: z.string().regex(/^0(3|5|7|8|9)\d{8}$/, {
    message: "Invalid phone number.",
  }),
});

const RightUserProfile: React.FC = () => {
  const { t } = useTranslation();
  const { me, setMe } = useAuthStore((state) => state);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isOpenAddressDialog, setIsOpenAddressDialog] =
    useState<boolean>(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "Vancouver, British Columbia\nCanada",
    email: me?.email || "",
    phone: me?.phone || "",
  });
  const { defaultAddr } = useAddress();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: me?.phone || "",
    },
  });

  const { mutate: updatePhone, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setContactInfo((prev) => ({
        ...prev,
        phone: data.phone,
      }));
      setMe(data);
      setIsPhoneDialogOpen(false);
    },
    onError: () => {
      toastError("Phone number failed, please try again");
    },
  });

  const handlePhoneSave = (values: z.infer<typeof formSchema>) => {
    updatePhone({ phone: values.phone });
  };

  return (
    <>
      <Card className="p-6 rounded-md shadow bg-primary">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-secondary-foreground">
            {t("Contact Information")}
          </h2>
          <button
            id="editContactBtn"
            className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
        <Separator className="my-4" />
        {/* Contact Info Display */}
        <div className="space-y-2 mt-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t("Address in use")}
              </p>
              {defaultAddr ? (
                <p className="text-base font-medium mt-1">
                  {defaultAddr.streetAddress}, {defaultAddr.ward},{" "}
                  {defaultAddr.district}, {defaultAddr.province}
                  {defaultAddr.isDefault && (
                    <span className="ml-2 text-xs text-green-600">
                      ({t("default")})
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-base text-destructive mt-1">
                  {t("No address selected")}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setIsOpenAddressDialog(true)}
            >
              {t("Change")}
            </Button>
          </div>
          <Separator className="my-4" />
          <div>
            <div className="flex items-center gap-40">
              <h3 className="font-medium text-secondary-foreground">Email</h3>
              <p className="text-txt-brand">{contactInfo.email}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-38">
              <h3 className="font-medium text-secondary-foreground">
                {t("Phone")}
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-txt-brand">{me?.phone}</p>
                <button
                  id="editPhoneBtn"
                  className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
                  onClick={() => {
                    setIsPhoneDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Edit phone number")}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              className="w-full space-y-3"
              onSubmit={form.handleSubmit(handlePhoneSave)}
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Number phone")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsPhoneDialogOpen(false);
                  }}
                  type="button"
                >
                  {t("Cancel")}
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  disabled={isPending}
                >
                  {t("Save")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <HandleAddressDialog
        isOpen={isOpenAddressDialog}
        onOpenChange={setIsOpenAddressDialog}
      />
    </>
  );
};

export default RightUserProfile;
