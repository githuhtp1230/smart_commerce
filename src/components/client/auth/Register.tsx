import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { registerRequest, verifyOtpRequest } from "@/services/auth.service";
import OTPInputWithSeparator from "@/components/OTPInput";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { toastError, toastSuccess } from "@/components/common/sonner";
import CustomInput from "@/components/common/input/CustomInput";
import { useTranslation } from "react-i18next";



const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formSchema = z
    .object({
      username: z.string().min(3, t("validation.username_required")),
      email: z.string().min(3, t("validation.email_required")),
      password: z.string().min(3, t("validation.password_required")),
      confirmPassword: z.string().min(3, t("validation.confirm_password_required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("validation.confirm_mismatch"),
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isShowOtp, setIsShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailState, setEmailState] = useState("");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await registerRequest({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      setEmailState(values.email);
      setIsShowOtp(true);
      toastSuccess("OTP code has been sent to your email");
    } catch (err) {
      console.error(err);
      toastError("Registration failed. Email may already exist.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtpRequest({
        email: emailState,
        otp,
      });
      toastSuccess("Registration successful");
      navigate(PATH.LOGIN);
    } catch (err) {
      console.error(err);
      toastError("OTP code is incorrect or expired");
    }
  };
  const handleOnChange = () => {
    if (isShowError) {
      setIsShowError(false);
    }
  };
  const [isShowError, setIsShowError] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form className="w-full space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel>{t("username")}</FormLabel>
              <FormControl>
                <CustomInput
                  placeholder={t("enter_username")}
                  {...field}
                  className="h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <CustomInput
                  prefixIcon={Mail}
                  placeholder={t("enter_email")}
                  field={field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleOnChange();
                  }}
                  hasError={!!form.formState.errors.email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <CustomInput
                  prefixIcon={Lock}
                  placeholder={t("enter_password")}
                  field={field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleOnChange();
                  }}
                  hasError={!!form.formState.errors.password}
                  isPassword
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel>{t("confirm_password")}</FormLabel>
              <FormControl>
                <CustomInput
                  prefixIcon={Lock}
                  placeholder={t("enter_confirm_password")}
                  field={field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleOnChange();
                  }}
                  hasError={!!form.formState.errors.confirmPassword}
                  isPassword
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isShowOtp && (
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 mt-3"
            type="submit"
          >
            {t("register")}
          </Button>
        )}
      </form>

      {isShowOtp && (
        <div className="space-y-3 mt-5">
          <FormLabel>Mã OTP đã được gửi đến email của bạn:</FormLabel>
          <OTPInputWithSeparator value={otp.padEnd(6, "")} onChange={setOtp} />

          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white h-12"
            onClick={handleVerifyOtp}
          >
            Xác nhận OTP
          </Button>
        </div>
      )}
    </Form>
  );
};

export default Register;
