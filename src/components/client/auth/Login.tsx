import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthTabs from "./AuthTabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type FC } from "react";
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
import ForgotPassword from "./ForgotPassword";

const formSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isCheckedRememberMe, setIsCheckedRememberMe] =
    useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);

  const setMe = useAuthStore((s) => s.setMe);

  const mutationKey = ["login"];
  const { mutate, isPending, data } = useMutation({
    mutationKey,
    mutationFn: loginRequest,
    onError: () => {
      setIsShowError(true);
    },
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

  const onSubmit = async (values: LoginForm) => {
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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div>

      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-1">
                  <FormLabel className="text-txt-tertiary font-medium text-base">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus:!ring-0 h-10 selection:bg-blue-400"
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
                <FormItem className="gap-1">
                  <FormLabel className="text-txt-tertiary font-medium text-base">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "***" : "password"}
                        className="focus:!ring-0 h-10 selection:bg-blue-400 pr-10"
                        placeholder="Enter password here"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange();
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-tertiary text-base"
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
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
              <p className="text-txt-tertiary text-base">Remember me</p>
            </div>
            <Button
              variant="link"
              className="text-blue-500 text-base"
              type="button"
            >
              <Link to={PATH.FORGOT_PASSWORD}>Forgot password?</Link>

            </Button>
          </div>
          {isShowError && <CardError message="Email or password is invalid" />}
          <Button
            className="w-full bg-blue-400 hover:bg-blue-400 h-12 mt-3 text-white"
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
