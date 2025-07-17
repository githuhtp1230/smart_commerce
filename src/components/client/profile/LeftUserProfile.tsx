import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/me.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toastSuccess } from "@/components/common/sonner";

interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}

const formSchema = z.object({
  phone: z.string().min(3, "Vui lòng nhập số điện thoại"),
});

const LeftUserProfile: React.FC = () => {
  const me = useAuthStore((state) => state.me);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "Vancouver, British Columbia\nCanada",
    email: me?.email || "",
    phone: me?.phone || "",
  });
  const [editForm, setEditForm] = useState<ContactInfo>(contactInfo);
  const [phoneForm, setPhoneForm] = useState(contactInfo.phone);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: me?.phone || "",
    },
  });
  const setMe = useAuthStore((s) => s.setMe);

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
      setPhoneError("Cập nhật số điện thoại thất bại.");
    },
  });

  const handlePhoneSave = (values: z.infer<typeof formSchema>) => {
    updatePhone({ phone: values.phone });
    toastSuccess("Phone number updated successfully");
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneForm(e.target.value);
    setPhoneError(null); // Clear error on input change
  };

  return (
    <>
      <Card className="p-6 rounded-md shadow bg-primary">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-secondary-foreground">
            Contact Information
          </h2>
          <button
            id="editContactBtn"
            className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
        <Separator className="my-4" />
        {/* Contact Info Display */}
        <div className="space-y-2 mt-0">
          <div>
            <div className="flex gap-20 mb-20">
              <h3 className="font-medium text-secondary-foreground">Address</h3>
              <p className="text-popover-foreground whitespace-pre-line">
                {contactInfo.address}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <div className="flex items-center gap-40">
              <h3 className="font-medium text-secondary-foreground">Email</h3>
              <p className="text-txt-brand">{contactInfo.email}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-50">
              <h3 className="font-medium text-secondary-foreground">Phone</h3>
              <div className="flex items-center gap-2">
                <p className="text-txt-brand">{contactInfo.phone}</p>
                <button
                  id="editPhoneBtn"
                  className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
                  onClick={() => {
                    setPhoneForm(contactInfo.phone);
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
            <DialogTitle>Edit phone number</DialogTitle>
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
                    <FormLabel>Number phone</FormLabel>
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
                    setPhoneError(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  disabled={isPending}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeftUserProfile;
