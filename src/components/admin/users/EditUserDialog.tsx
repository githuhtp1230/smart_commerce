"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomInput from "@/components/common/input/CustomInput";
import { uploadFile } from "@/services/upload.service";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PencilIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import CropImageDialog from "@/components/common/dialog/CropImageDialog";
import { toastError, toastSuccess } from "@/components/common/sonner";
import type { IUser } from "@/type/auth";
import { updateUser } from "@/services/users.service";


/** Schema validate */
const userSchema = z.object({
  name: z.string().min(1, "Tên không được để trống").max(50, "Tên quá dài"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ, phải có @"),
  phone: z
    .string()
    .regex(
      /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
      "Số điện thoại không hợp lệ. Bắt đầu bằng 0 và đúng đầu số VN"
    ),
  roleId: z.coerce.number().int().gt(0, "Vui lòng chọn role"),
  isActive: z.enum(["active", "locked"], {
    errorMap: () => ({ message: "Trạng thái phải là active hoặc locked" }),
  }),
  avatarUrl: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface EditUserDialogProps {
  user: IUser;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onUserUpdated?: (user: IUser) => void;
}

const roleMapping: Record<string, number> = {
  ADMIN: 1,
  USER: 2,
  STAFF: 3,
};

export default function EditUserDialog({
  user,
  isOpen,
  setIsOpen,
  onUserUpdated,
}: EditUserDialogProps) {
  const [avatarPreview, setAvatarPreview] = useState<string>(user.avatar ?? "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      roleId: roleMapping[user.role] ?? 2,
      isActive: user.isActive ? "active" : "locked",
      avatarUrl: user.avatar ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      roleId: roleMapping[user.role] ?? 2,
      isActive: user.isActive ? "active" : "locked",
      avatarUrl: user.avatar ?? "",
    });
    setAvatarPreview(user.avatar ?? "");
    setAvatarFile(null);
  }, [user]);

  const onSubmit: SubmitHandler<UserFormValues> = async (values) => {
    setLoading(true);
    try {
      let avatarUrl = values.avatarUrl ?? "";
      if (avatarFile) avatarUrl = await uploadFile(avatarFile);

      const payload = {
        id: user.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        roleId: values.roleId,
        isActive: values.isActive === "active", // ✅ convert sang boolean
        avatar: avatarUrl,
      };

      const updatedUser: IUser = await updateUser(payload);
      toastSuccess("Cập nhật người dùng thành công!");
      onUserUpdated?.(updatedUser);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toastError("Cập nhật người dùng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleCompletedCropImg = (img: string, file: File) => {
    setAvatarPreview(img);
    setAvatarFile(file);
    setIsDialogOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-lg max-h-[90vh] overflow-auto scrollbar-hide">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Chỉnh sửa người dùng
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Cập nhật thông tin tài khoản
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 p-1">
                  <Avatar className="w-full h-full rounded-full ring-4 ring-white dark:ring-gray-800 shadow-lg">
                    <AvatarImage
                      src={avatarPreview}
                      className="object-cover object-center"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-semibold">
                      {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Button
                  type="button"
                  size="sm"
                  className={cn(
                    "absolute -bottom-2 -right-2 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600",
                    "shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110",
                    "w-10 h-10 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20"
                  )}
                  onClick={() => setIsDialogOpen(true)}
                >
                  <PencilIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </Button>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Tên đầy đủ *
                      </FormLabel>
                      <FormControl>
                        <CustomInput
                          placeholder="Nhập tên đầy đủ"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                {/* Role */}
                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Vai trò
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={String(field.value ?? 2)}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn vai trò" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Admin</SelectItem>
                            <SelectItem value="2">User</SelectItem>
                            <SelectItem value="3">Staff</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Email *
                    </FormLabel>
                    <FormControl>
                      <CustomInput
                        type="email"
                        placeholder="example@email.com"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Số điện thoại *
                    </FormLabel>
                    <FormControl>
                      <CustomInput
                        placeholder="0xxx xxx xxx"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Trạng thái
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ?? "active"}
                        onValueChange={(val) => field.onChange(val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="locked">Locked</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
              </Button>
            </div>
          </form>
        </Form>

        {/* Crop Dialog */}
        <CropImageDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          onCompletedCropImage={handleCompletedCropImg}
        />
      </div>
    </div>
  );
}
