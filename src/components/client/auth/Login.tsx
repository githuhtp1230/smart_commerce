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
import { useState, type FC } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});

const Login = () => {
  const [isCheckedRememberMe, setIsCheckedRememberMe] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div>
      <Form {...form}>
        <form className="w-full">
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
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus:!ring-0 h-10"
                      placeholder="Enter password here"
                      {...field}
                    />
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
            <Button variant="link" className="text-blue-500 text-base">
              Forgot password?
            </Button>
          </div>
          <Button className="w-full bg-blue-400 hover:bg-blue-400 h-12 mt-3 text-base">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
