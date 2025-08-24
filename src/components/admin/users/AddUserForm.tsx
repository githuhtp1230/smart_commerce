import { useState } from "react";
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
import { createUser, type ICreateUser } from "@/services/users.service";
import { toastError, toastSuccess } from "@/components/common/sonner";
import { uploadFile } from "@/services/upload.service";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PencilIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import CropImageDialog from "@/components/common/dialog/CropImageDialog";
import type { IUser } from "@/type/auth";
import { useTranslation } from "react-i18next";

/** Schema validate */
const userSchema = z.object({
  name: z.string().min(1, "Tên không được để trống").max(50, "Tên quá dài"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ, phải có @"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(50, "Mật khẩu quá dài"),
  phone: z
    .string()
    .regex(
      /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
      "Số điện thoại không hợp lệ. Bắt đầu bằng 0 và đúng đầu số VN"
    ),
  // ép về number + message rõ ràng
  roleId: z.coerce.number().int().gt(0, "Vui lòng chọn role"),
  isActive: z.enum(["active", "locked"], {
    errorMap: () => ({ message: "Trạng thái phải là active hoặc locked" }),
  }),
  avatarUrl: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface AddUserFormProps {
  onUserAdded?: (user: IUser) => void;
}

export default function AddUserForm({ onUserAdded }: AddUserFormProps) {
  const { t } = useTranslation();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      roleId: 0,
      isActive: "active",
      avatarUrl: "",
    },
  });

  const onSubmit: SubmitHandler<UserFormValues> = async (values) => {
    setLoading(true);
    try {
      let avatarUrl: string | undefined = values.avatarUrl;
      if (avatarFile) avatarUrl = await uploadFile(avatarFile);

      const payload: ICreateUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        roleId: values.roleId,
        isActive: values.isActive === "active",
        avatar: avatarUrl,
      };

      const newUser: IUser = await createUser(payload);
      toastSuccess(t("User added successfully!"));
      form.reset();
      setAvatarPreview(undefined);
      setAvatarFile(null);
      onUserAdded?.(newUser);
    } catch (err) {
      console.error(err);
      toastError(t("Add user failed!"));
    } finally {
      setLoading(false);
    }
  };

  const handleCompletedCropImg = (img: string, file: File) => {
    setAvatarPreview(img);
    setAvatarFile(file);
    setIsOpenDialog(false);
  };

  // các class “khóa layout”
  const LABEL = "text-sm font-medium leading-5 min-h-[20px] line-clamp-2";
  const INPUT = "h-10 w-full";
  const MSG = "text-red-500 text-sm leading-5 min-h-[34px] block"; // luôn giữ chiều cao, không làm input co lại
  const ITEM =
    // 3 hàng: label (20px+), control (auto), message (34px+)
    "grid grid-rows-[minmax(20px,auto)_auto_minmax(34px,auto)] gap-1";

  return (
    <div className="flex justify-center">
      <div className="w-full px-4 mx-4 bg-background-primary shadow-lg rounded-2xl p-2 mb-4 ">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-16 items-center">
              <div className="flex justify-center ">
                <div className="relative w-32 h-32">
                  <Avatar className="w-32 h-32 rounded-full">
                    <AvatarImage
                      src={avatarPreview || form.getValues("avatarUrl")}
                      className="object-contain object-center border border-border-primary"
                    />
                    <AvatarFallback>{t("Avatar")}</AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    className={cn(
                      "absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
                      "rounded-full bg-white border border-gray-300 size-9 flex items-center justify-center shadow-md"
                    )}
                    onClick={() => setIsOpenDialog(true)}
                  >
                    <PencilIcon className="size-4 text-gray-700" />
                  </Button>
                </div>
              </div>

              {/* Inputs: 2 cột, nhiều dòng */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2 flex-1 ">
                <FormField
                  control={form.control}
                  name="name"

                  render={({ field }) => (
                    <FormItem className={`${ITEM} flex flex-col justify-center`}>
                      <FormLabel className={LABEL}>{t("Name *")}</FormLabel>
                      <FormControl>
                        <CustomInput
                          placeholder={t("Full name")}
                          {...field}
                          className={INPUT}
                        />
                      </FormControl>
                      <div className="min-h-[34px]">
                        <FormMessage className={MSG} />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className={`${ITEM} flex flex-col justify-center`}>
                      <FormLabel className={LABEL}>{t("Password *")}</FormLabel>
                      <FormControl>
                        <CustomInput
                          type="password"
                          placeholder={t("Password")}
                          {...field}
                          className={INPUT}
                        />
                      </FormControl>
                      <div className="min-h-[34px]">
                        <FormMessage className={MSG} />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem className={`${ITEM} flex flex-col justify-center`}>
                      <FormLabel className={LABEL}>
                        {t("Role (default is user)*")}
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(val) => field.onChange(val)}
                        >
                          <SelectTrigger className="h-10 w-min px-3 rounded-md border border-gray-300 bg-white text-sm flex items-center">
                            <SelectValue placeholder={t("Select role")} />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-white text-sm">
                            <SelectItem value="1">{t("Admin")}</SelectItem>
                            <SelectItem value="2">{t("User")}</SelectItem>
                            <SelectItem value="3">{t("Staff")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <div className="min-h-[34px]">
                        <FormMessage className={MSG} />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={`${ITEM} flex flex-col justify-center`}>
                      <FormLabel className={LABEL}>{t("Email*")}</FormLabel>
                      <FormControl>
                        <CustomInput
                          type="email"
                          placeholder="Email"
                          {...field}
                          className={INPUT}
                        />
                      </FormControl>
                      <div className="min-h-[34px]">
                        <FormMessage className={MSG} />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className={`${ITEM} flex flex-col justify-center`}>
                      <FormLabel className={LABEL}>{t("Phone *")}</FormLabel>
                      <FormControl>
                        <CustomInput
                          placeholder={t("Phone number")}
                          {...field}
                          className={INPUT}
                        />
                      </FormControl>
                      <div className="min-h-[34px]">
                        <FormMessage className={MSG} />
                      </div>
                    </FormItem>
                  )}
                />

              </div>
            </div>

            {/* Submit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 w-full mt-2 ">
              <div></div>
              <div className="flex justify-end mr-10 mb-5">
                <Button
                  type="submit"
                  className="px-8 bg-blue-500 text-white hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? t("Adding...") : t("Add user")}
                </Button>
              </div>
            </div>
          </form>
        </Form>

        {/* Crop Dialog */}
        <CropImageDialog
          isOpen={isOpenDialog}
          setIsOpen={setIsOpenDialog}
          onCompletedCropImage={handleCompletedCropImg}
        />
      </div>
    </div>

  );
}
