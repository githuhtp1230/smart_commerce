import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/services/auth.service";
import CardError from "../../common/notification/CardError";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { useAuthStore } from "@/store/auth-store";
import saveToken from "@/utils/token-util";
import { SECURITY } from "@/constants/common";
import { Eye, EyeOff } from "lucide-react";

// Firebase auth
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const formSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isCheckedRememberMe, setIsCheckedRememberMe] = useState(false);
  const [isShowError, setIsShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setMe = useAuthStore((s) => s.setMe);

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginRequest,
    onError: () => setIsShowError(true),
    onSuccess: (data) => {
      navigate(PATH.HOME_PAGE);
      setMe(data.user);
      if (data.accessToken) {
        saveToken(data.accessToken, SECURITY.ACCESS_TOKEN);
      }
    },
  });

  type LoginForm = z.infer<typeof formSchema>;

  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginForm) => {
    const { email, password } = values;
    if (email && password) {
      mutate({ email, password });
    }
  };

  const handleOnChange = () => {
    if (isShowError) {
      setIsShowError(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const accessToken = await user.getIdToken();

      // (Optional) Gửi token này về backend để xác thực nếu cần
      setMe({ email: user.email });
      saveToken(accessToken, SECURITY.ACCESS_TOKEN);
      navigate(PATH.HOME_PAGE);
    } catch (error) {
      console.error("Google login failed", error);
      setIsShowError(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email here"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleOnChange();
                    }}
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
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password here"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange();
                      }}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(e) => setIsCheckedRememberMe(e === true)}
                checked={isCheckedRememberMe}
                className={cn(
                  "size-5",
                  isCheckedRememberMe
                    ? "!bg-blue-400 !border-transparent"
                    : "!bg-transparent"
                )}
              />
              <span className="text-base text-gray-600">Remember me</span>
            </div>
            <Button
              variant="link"
              type="button"
              className="text-blue-500 p-0 h-auto"
            >
              <Link to={PATH.FORGOT_PASSWORD}>Forgot password?</Link>
            </Button>
          </div>

          {isShowError && (
            <CardError message="Email hoặc mật khẩu không đúng" />
          )}

          <Button
            className="w-full bg-blue-400 hover:bg-blue-500 text-white h-12"
            disabled={isPending}
          >
            Đăng nhập
          </Button>
        </form>
      </Form>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <span className="w-full border-t" />
        <span>hoặc</span>
        <span className="w-full border-t" />
      </div>

      <Button
        type="button"
        onClick={handleLoginWithGoogle}
        className="w-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
        variant="outline"
      >
        Đăng nhập bằng Google
      </Button>
    </div>
  );
};

export default Login;
