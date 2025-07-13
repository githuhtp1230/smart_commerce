import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
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

const UserProfileCard: React.FC = () => {
  const [name, setName] = useState("Ansolo Lazinatov");
  const [nameForm, setNameForm] = useState(name);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const handleNameSave = () => {
    if (!nameForm.trim()) {
      setNameError("Tên không được để trống.");
      return;
    }
    setName(nameForm);
    setNameError(null);
    setIsNameDialogOpen(false);
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameForm(e.target.value);
    setNameError(null); // Clear error on input change
  };

  return (
    <>
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
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-secondary-foreground">
                {name}
              </h2>
              <button
                id="editNameBtn"
                className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
                onClick={() => {
                  setNameForm(name);
                  setIsNameDialogOpen(true);
                }}
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <p className="text-muted-foreground">Joined 3 months ago</p>
          </div>
        </div>
        <Separator className="w-full my-6 mb-0 mt-13" />
        <div className="grid grid-cols-3 gap-12 mt-0">
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
            <p className="text-xl font-semibold text-secondary-foreground">
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

      {/* Edit Name Dialog */}
      <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit name</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={nameForm}
                onChange={handleNameInputChange}
                placeholder="Nhập tên của bạn"
                className="mt-2"
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsNameDialogOpen(false);
                setNameError(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleNameSave}
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

export default UserProfileCard;
