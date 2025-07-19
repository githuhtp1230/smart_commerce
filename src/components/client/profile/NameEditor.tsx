import React, { useState } from "react";
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

interface UserData {
  name: string | null;
  avatar: string | null;
}

const formSchema = z.object({
  username: z.string().min(3, "Username must be longer than 3 characters"),
});


interface NameEditorProps {
  userName: string | null;
  onNameChange: (data: UserData) => void;
}

const NameEditor: React.FC<NameEditorProps> = ({ userName, onNameChange }) => {
  const [isNameDialogOpen, setIsNameDialogOpen] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userName || "",
    },
  });

  const { mutate: updateName, isPending: isNamePending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data: UserData) => {
      onNameChange(data);
      setIsNameDialogOpen(false);
      toastSuccess("Name updated successfully");
    },
    onError: () => {
      toastError("Name update failed, please try again");
    },
  });

  const handleNameSave = (values: { username: string }) => {
    updateName({ name: values.username });
  };

  return (
    <div className="flex-1 space-y-4 mt-10">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold text-secondary-foreground">
          {userName}
        </h2>
        <button
          id="editNameBtn"
          className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
          onClick={() => setIsNameDialogOpen(true)}
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>
      <p className="text-muted-foreground">Joined 3 months ago</p>
      <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Name</DialogTitle>
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
                  onClick={() => setIsNameDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  disabled={isNamePending}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NameEditor;
