import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { KeyRound, Linkedin, Pencil, Twitter } from 'lucide-react';
import { Facebook } from '@/assets/icons';
const Profile: React.FC = () => {
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

const [contactInfo, setContactInfo] = useState({
  address: "Vancouver, British Columbia\nCanada",
  email: "shatinon@jeemail.com",
  phone: "+1234567890"
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
        <h1 className="text-2xl font-bold text-secondary-foreground">Profile</h1>
        <div className="flex space-x-3 text-secondary-foreground">
          <Button variant="outline" className="flex items-center space-x-2 whitespace-nowrap cursor-pointer !rounded-button">
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
          <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20smiling%20Asian%20man%20in%20his%2030s%20wearing%20a%20light%20blue%20button-up%20shirt%20against%20a%20neutral%20dark%20green%20background%2C%20business%20headshot%20with%20soft%20lighting%2C%20high%20quality%20professional%20photo&width=300&height=300&seq=1&orientation=squarish" alt="Ansolo Lazinatov" />
          <AvatarFallback className="text-2xl">AL</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4 mt-10">
            <div>
              <h2 className="text-2xl font-semibold text-secondary-foreground">Ansolo Lazinatov</h2>
              <p className="text-gray-500 dark:text-shadow-white">Joined 3 months ago</p>
            </div>    
            <div className="flex space-x-3 ">
              <a href="#" className="text-gray-400 hover:text-blue-600 cursor-pointer">
                <Linkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 cursor-pointer">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 cursor-pointer">
                <Twitter />
              </a>
            </div>
            </div>
            </div>
             <Separator className="w-full border-t border-dashed border-gray-300 my-6 mb-0" />
            <div className="grid grid-cols-3 gap-12 mt-0 ">
              <div className='space-y-2'>
                <h6 className="text-sm font-medium text-muted-foreground">Total Spent</h6>
                <h4 className="text-xl font-semibold text-secondary-foreground">18,800,000 VNĐ</h4>
              </div>
              <div className='space-y-2'>
                <h6 className="text-sm font-medium text-muted-foreground">Last Order</h6>
                <p className="text-xl font-semibold text-secondary-foreground ">1 week ago</p>
              </div>
              <div className='space-y-2 ml-30'>
                <h6 className="text-sm font-medium text-muted-foreground">Total Orders</h6>
                <p className="text-xl font-semibold text-secondary-foreground">97</p>
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
              className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 cursor-pointer"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <Separator className="my-4 border-t border-dashed border-gray-300 mt-0 mb-0" />

          {/* --- Dialog --- */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle>Edit Contact Information</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    placeholder="Enter your address"
                    className="
                      min-h-[80px]
                      !bg-white !text-black !placeholder-gray-400
                      dark:!bg-gray-800 dark:!text-white dark:!placeholder-gray-300
                      !border !border-gray-300 dark:!border-gray-600
                      focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent
                    "
                  />

                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="(+84) 0123456789"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 dark:border-gray-500 dark:text-gray-300"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* --- Contact Info Display --- */}
          <div className="space-y-2 mt-0">
            <div>
              <div className="flex gap-20 mb-20">
                <h3 className=" font-medium text-secondary-foreground">Address</h3>
                <p className="text-gray-800 dark:text-white whitespace-pre-line">
                  {contactInfo.address}
                </p>
              </div>
            </div>

            <Separator className="my-4 border-t border-dashed border-gray-300" />
            <div>
              <div className="flex items-center gap-40">
                <h3 className=" font-medium text-secondary-foreground ">Email</h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-55">
                <h3 className="font-medium text-secondary-foreground">Phone</h3>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </Card>

      </div>
  </main>
</div>
    );
    };
export default Profile