import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}

const UserContactCard: React.FC = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "Vancouver, British Columbia\nCanada",
    email: "shatinon@jeemail.com",
    phone: "+1234567890",
  });
  const [editForm, setEditForm] = useState<ContactInfo>(contactInfo);
  const [phoneForm, setPhoneForm] = useState(contactInfo.phone);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleSave = () => {
    setContactInfo(editForm);
    setIsEditDialogOpen(false);
  };

  const handlePhoneSave = () => {
    if (!phoneForm.trim()) {
      setPhoneError("Số điện thoại không được để trống.");
      return;
    }
    setContactInfo((prev) => ({ ...prev, phone: phoneForm }));
    setPhoneError(null);
    setIsPhoneDialogOpen(false);
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
          <div className="space-y-3">
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-secondary-foreground transition-colors duration-200"
              >
                Number phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={phoneForm}
                onChange={handlePhoneInputChange}
                placeholder="Nhập số điện thoại (VD: +84 123 456 789)"
                type="tel"
                className="w-full px-4 py-2 "
              />
              {phoneError && (
                <p className="text-sm text-red-500 font-medium mt-1 animate-fade-in">
                  {phoneError}
                </p>
              )}
            </div>
          </div>
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
              onClick={handlePhoneSave}
              className="bg-blue-500 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserContactCard;
