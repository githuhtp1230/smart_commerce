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

const formSchema = z
  .object({
    username: z.string().min(3, "Vui lòng nhập username"),
    email: z.string().min(3, "Vui lòng nhập email"),
    password: z.string().min(3, "Vui lòng nhập mật khẩu"),
    confirmPassword: z.string().min(3, "Vui lòng nhập xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

const Register = () => {
  const navigate = useNavigate();
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <CustomInput
                  placeholder="Nhập username"
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <CustomInput
                  prefixIcon={Mail}
                  placeholder="Enter email here"
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
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <CustomInput
                  prefixIcon={Lock}
                  placeholder="Enter password here"
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
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <CustomInput
                  prefixIcon={Lock}
                  placeholder="Enter confirm password here"
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
            Đăng ký
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
