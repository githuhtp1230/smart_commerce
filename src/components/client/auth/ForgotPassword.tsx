import React from 'react'
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { PATH } from "@/constants/path";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';
import { sendForgotPasswordOTPRequest, verifyForgotPasswordOtpRequest } from '@/services/auth.service';
import { useState } from "react";
import OTPInputWithSeparator from "@/components/OTPInput";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    email: z.string().nonempty("Vui lòng nhập email").email("Email không hợp lệ"),
});




const ForgotPassword = () => {
    const navigate = useNavigate();
    const [emailState, setEmailState] = useState("");
    const [isShowOtp, setIsShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await sendForgotPasswordOTPRequest({
                email: values.email,
            });
            setEmailState(values.email);
            setIsShowOtp(true);
            alert("Mã OTP đã được gửi đến email của bạn.");
        } catch (err) {
            console.error(err);
            alert("Gửi mã OTP thất bại. Vui lòng thử lại.");
        }
    };
    const handleVerifyOtp = async () => {
        try {
            await verifyForgotPasswordOtpRequest({
                email: emailState,
                otp,
            });
            alert("Mật khẩu mới đã được gửi đến email của bạn, vui lòng kiểm tra email!");
            navigate(PATH.LOGIN);
        } catch (err) {
            console.error(err);
            alert("Mã OTP không chính xác hoặc đã hết hạn.");
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    return (
        <div>
            <h1 className="font-medium text-xl text-center">Forgot your password?</h1>
            <Form {...form} >
                <form className="w-full my-5" onSubmit={form.handleSubmit(onSubmit)}>
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
                                            className="focus:!ring-0 h-10 selection:bg-blue-400 "
                                            placeholder="Enter your email"
                                            {...field}

                                            disabled={isShowOtp}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {!isShowOtp && (
                        <Button
                            type="submit"
                            className="w-full bg-blue-400 hover:bg-blue-400 h-12 mt-3 text-white"
                            onClick={() =>
                                toast("Event has been created", {
                                    description: "Sunday, December 03, 2023 at 9:00 AM",
                                    action: {
                                        label: "Undo",
                                        onClick: () => console.log("Undo"),
                                    },
                                })
                            }>
                            Send OTP
                        </Button>
                    )}
                    {isShowOtp && (
                        <div className="space-y-3 mt-5">
                            <FormLabel>Mã OTP đã được gửi đến email của bạn:</FormLabel>
                            <OTPInputWithSeparator value={otp.padEnd(6, "")} onChange={setOtp} />

                            <Button
                                type="button"
                                className="w-full bg-green-500 hover:bg-green-600 text-white h-12"
                                onClick={handleVerifyOtp}
                            >
                                Xác nhận OTP
                            </Button>
                        </div>
                    )}

                    <Button asChild className="w-full text-blue h-12 mt-3 border-2 border-border-primary">
                        <Link to={PATH.LOGIN}>Back</Link>
                    </Button>

                </form>
            </Form>

        </div >
    )
}

export default ForgotPassword;