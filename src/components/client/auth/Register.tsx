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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
const onSubmit = async(values: z.infer<typeof formSchema>) => {
  const { email, password, username} = values;
  if (email && password && username) {
      //
    }
};
const [showPassword, setShowPassword] = useState<boolean>(false);
const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  return (
    <Form {...form}>
      <form className="w-full space-y-3"  onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-txt-tertiary font-medium text-base">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  className="focus:!ring-0 h-10"
                  placeholder="Enter username here"
                  {...field}
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
              <FormLabel className="text-txt-tertiary font-medium text-base">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  className="focus:!ring-0 h-10"
                  placeholder="Enter email here"
                  {...field}
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
                type={showPassword ?  "text" : "password"}
                  className="focus:!ring-0 h-10"
                  placeholder="Enter password here"
                  {...field}
                />
                <button
                        type="button"
                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-tertiary text-base"
                      >
                        {showPassword ? (
                          <Eye/>
                        ) : (
                          <EyeOff/>
                        )}
                      </button>
                </div>
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
              <FormLabel className="text-txt-tertiary font-medium text-base">
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                <Input
                type={showConfirmPassword ? "text" : "password"}
                  className="focus:!ring-0 h-10"
                  placeholder="Enter password here"
                  {...field}
                />
                <button
                        type="button"
                        onClick={() => setShowConfirmPassword((showPassword2) => !showPassword2)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-tertiary text-base"
                      >
                        {showConfirmPassword ? (
                          <Eye/>
                        ) : (
                          <EyeOff/>
                        )}
                      </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
            className="w-full bg-blue-400 hover:bg-blue-400 h-12 mt-3 text-white"
           
          >
            Register
          </Button>
      </form>
    </Form>
  );
};

export default Register;
