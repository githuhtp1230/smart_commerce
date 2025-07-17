import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
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
import { toastError, toastSuccess } from "@/components/common/sonner";
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

const formSchema = z.object({
  username: z.string().min(3, "Vui lòng nhập username"),
});
const LeftUserProfile: React.FC = () => {
  const me = useAuthStore((state) => state.me);
  const [name, setName] = useState(me?.name || "");
  const [nameForm, setNameForm] = useState(me?.name || "");
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: me?.name || "",
    },
  });

  const setMe = useAuthStore((s) => s.setMe);

  const { mutate: updateName, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setName(data.name);
      setMe(data);
      setIsNameDialogOpen(false);
      toastSuccess("Name updated successfully");
    },
    onError: () => {
      setNameError("Cập nhật thất bại. Vui lòng thử lại.");
      toastError("Name update failed, please try again");
    },
  });

  const handleNameSave = (values: z.infer<typeof formSchema>) => {
    updateName({ name: values.username }); //
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

          <Form {...form}>
            <form
              className="w-full space-y-3"
              onSubmit={form.handleSubmit(handleNameSave)}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                    setIsNameDialogOpen(false);
                    setNameError(null);
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
