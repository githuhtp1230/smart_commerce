import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { KeyRound, Lock } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../input/CustomInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toastSuccess } from "../sonner";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/auth.service";
import CardError from "../notification/CardError";
import { useTranslation } from "react-i18next";
const formSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z.string().min(1, "Vui lòng nhập mật khẩu mới"),
    confirmNewPassword: z
      .string()
      .min(1, "Vui lòng nhập xác nhận lại mật khẩu mới"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });
const ChangePasswordButton = () => {
  const { t } = useTranslation();
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  type ChangePasswordForm = z.infer<typeof formSchema>;

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit = async (values: ChangePasswordForm) => {
    const { currentPassword, newPassword } = values;
    if (currentPassword && newPassword) {
      mutate({ currentPassword, newPassword });
    }
  };

  const mutationKey = ["changepassword"];
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn: changePassword,
    onError: () => {
      setIsShowError(true);
    },
    onSuccess: () => {
      toastSuccess("Change password successful");
      form.reset();
      setIsDialogOpen(false);
    },
  });

  const handleOnChange = () => {
    if (isShowError) {
      setIsShowError(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 whitespace-nowrap cursor-pointer !rounded-button"
        >
          <KeyRound />
          <span>{t("Change password")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Change Password")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="w-full " onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3 mb-3">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="text-txt-tertiary  text-base">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <CustomInput
                        prefixIcon={Lock}
                        placeholder="Enter current password here"
                        field={field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange();
                        }}
                        hasError={!!form.formState.errors.currentPassword}
                        isPassword
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="text-txt-tertiary  text-base">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <CustomInput
                        prefixIcon={Lock}
                        placeholder="Enter new password here"
                        field={field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange();
                        }}
                        hasError={!!form.formState.errors.newPassword}
                        isPassword
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="text-txt-tertiary  text-base">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <CustomInput
                        prefixIcon={Lock}
                        placeholder="Enter confirm new password here"
                        field={field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange();
                        }}
                        hasError={!!form.formState.errors.confirmNewPassword}
                        isPassword
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isShowError && (
              <CardError message="Current password is invalid !" />
            )}
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsShowError(false);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="outline"
                type="submit"
                className=" bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                disabled={isPending}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordButton;
