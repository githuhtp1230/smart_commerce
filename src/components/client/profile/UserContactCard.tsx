"use client";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils"; // đảm bảo bạn có hàm cn()

interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}

const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number too short")
    .regex(/^(\+84|0)(\d{9})$/, "Invalid phone number"),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

const UserContactCard: React.FC = () => {
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "Vancouver, British Columbia\nCanada",
    email: "shatinon@jeemail.com",
    phone: "+1234567890",
  });

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: contactInfo.phone,
    },
  });

  const handlePhoneSave = (values: PhoneFormValues) => {
    setContactInfo((prev) => ({ ...prev, phone: values.phone }));
    setIsPhoneDialogOpen(false);
  };

  return (
    <>
      <Card className="p-6 rounded-md shadow bg-primary">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-secondary-foreground">
            Contact Information
          </h2>
          <button
            className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
            onClick={() => {}}
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
        <Separator className="my-4" />

        <div className="space-y-2 mt-0">
          <div className="flex gap-20 mb-20">
            <h3 className="font-medium text-secondary-foreground">Address</h3>
            <p className="text-popover-foreground whitespace-pre-line">
              {contactInfo.address}
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center gap-40">
            <h3 className="font-medium text-secondary-foreground">Email</h3>
            <p className="text-txt-brand">{contactInfo.email}</p>
          </div>
          <div className="flex items-center gap-50">
            <h3 className="font-medium text-secondary-foreground">Phone</h3>
            <div className="flex items-center gap-2">
              <p className="text-txt-brand">{contactInfo.phone}</p>
              <button
                className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
                onClick={() => {
                  phoneForm.reset({ phone: contactInfo.phone });
                  setIsPhoneDialogOpen(true);
                }}
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Phone Dialog */}
      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit number phone</DialogTitle>
          </DialogHeader>

          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit(handlePhoneSave)}
              className="space-y-4"
            >
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        className={cn(
                          "border h-10 px-4 py-2 selection:bg-blue-400",
                          phoneForm.formState.errors.phone &&
                            "border-red-500 ring-red-500 focus-visible:ring-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsPhoneDialogOpen(false);
                    phoneForm.clearErrors();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white"
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

export default UserContactCard;
