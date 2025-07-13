"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const nameSchema = z.object({
  name: z.string().min(1, "Name can not be blank."),
});

type NameFormValues = z.infer<typeof nameSchema>;

const UserProfileCard: React.FC = () => {
  const [name, setName] = useState("Ansolo Lazinatov");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name,
    },
  });

  const handleSubmit = (values: NameFormValues) => {
    setName(values.name.trim());
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card className="col-span-2 p-6 bg-primary">
        <div className="flex items-start gap-6">
          <Avatar className="h-40 w-40">
            <AvatarImage
              src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20smiling%20Asian%20man%20in%20his%2030s%20wearing%20a%20light%20blue%20button-up%20shirt%20against%20a%20neutral%20dark%20green%20background%2C%20business%20headshot%20with%20soft%20lighting%2C%20high%20quality%20professional%20photo&width=300&height=300&seq=1&orientation=squarish"
              alt="User avatar"
            />
            <AvatarFallback className="text-2xl">AL</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4 mt-10">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-secondary-foreground">
                {name}
              </h2>
              <button
                onClick={() => {
                  form.reset({ name });
                  setIsDialogOpen(true);
                }}
                className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit name</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập tên của bạn"
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    form.clearErrors();
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

export default UserProfileCard;
