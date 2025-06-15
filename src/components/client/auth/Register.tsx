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
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});
const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form className="w-full space-y-3">
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
        <Button className="w-full bg-blue-400 hover:bg-blue-400 h-12 mt-3 text-base">
          Register
        </Button>
      </form>
    </Form>
  );
};

export default Register;
