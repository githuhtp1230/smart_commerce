import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { KeyRound, Linkedin, Pencil, Twitter } from "lucide-react";
import { Facebook } from "@/assets/icons";
const Profile: React.FC = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    address: "Vancouver, British Columbia\nCanada",
    email: "shatinon@jeemail.com",
    phone: "+1234567890",
  });
  const [editForm, setEditForm] = useState(contactInfo);

  const handleSave = () => {
    setContactInfo(editForm);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      {/* Main Content */}
      <main className="container mx-auto py-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-secondary-foreground">
            Profile
          </h1>
          <div className="flex space-x-3 text-secondary-foreground bg-primary">
            <Button
              variant="outline"
              className="flex items-center space-x-2 whitespace-nowrap cursor-pointer !rounded-button"
            >
              <KeyRound />
              <span>Reset password</span>
            </Button>
          </div>
        </div>
        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="col-span-2 p-6 bg-primary">
            <div className="flex items-start gap-6">
              <Avatar className="h-40 w-40">
                <AvatarImage
                  src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20smiling%20Asian%20man%20in%20his%2030s%20wearing%20a%20light%20blue%20button-up%20shirt%20against%20a%20neutral%20dark%20green%20background%2C%20business%20headshot%20with%20soft%20lighting%2C%20high%20quality%20professional%20photo&width=300&height=300&seq=1&orientation=squarish"
                  alt="Ansolo Lazinatov"
                />
                <AvatarFallback className="text-2xl">AL</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4 mt-10">
                <div>
                  <h2 className="text-2xl font-semibold text-secondary-foreground">
                    Ansolo Lazinatov
                  </h2>
                  <p className="text-muted-foreground">Joined 3 months ago</p>
                </div>
              </div>
            </div>
            <Separator className="w-full  my-6 mb-0 mt-13" />
            <div className="grid grid-cols-3 gap-12 mt-0 ">
              <div className="space-y-2">
                <h6 className="text-sm font-medium text-muted-foreground">
                  Total Spent
                </h6>
                <h4 className="text-xl font-semibold text-secondary-foreground">
                  18,800,000 VNĐ
                </h4>
              </div>
              <div className="space-y-2">
                <h6 className="text-sm font-medium text-muted-foreground">
                  Last Order
                </h6>
                <p className="text-xl font-semibold text-secondary-foreground ">
                  1 week ago
                </p>
              </div>
              <div className="space-y-2 ml-30">
                <h6 className="text-sm font-medium text-muted-foreground">
                  Total Orders
                </h6>
                <p className="text-xl font-semibold text-secondary-foreground">
                  97
                </p>
              </div>
            </div>
          </Card>
          {/* Address Info */}
          <Card className="p-6 rounded-md shadow bg-primary">
            <div className="flex items-center justify-between ">
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
            <Separator className="my-4 " />

            {/* --- Contact Info Display --- */}
            <div className="space-y-2 mt-0">
              <div>
                <div className="flex gap-20 mb-20">
                  <h3 className=" font-medium text-secondary-foreground">
                    Address
                  </h3>
                  <p className="text-popover-foreground whitespace-pre-line">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              <Separator className="my-4 " />
              <div>
                <div className="flex items-center gap-40">
                  <h3 className=" font-medium text-secondary-foreground ">
                    Email
                  </h3>
                  <p className="text-txt-brand">{contactInfo.email}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-55">
                  <h3 className="font-medium text-secondary-foreground">
                    Phone
                  </h3>
                  <p className="text-txt-brand">{contactInfo.phone}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
export default Profile;
