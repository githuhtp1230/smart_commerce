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
import { toastError } from "@/components/common/sonner";

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
  const { me, setMe } = useAuthStore((state) => state);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "Vancouver, British Columbia\nCanada",
    email: me?.email || "",
    phone: me?.phone || "",
  });

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
            Contact Information
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
                  }}
                  type="button"
                  className="border-border-primary"
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

export default RightUserProfile;
