import React from 'react'
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ForgotPassword = () => {

    return (
        <div>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button
                            variant="link"
                            className="text-blue-500 text-base"
                            type="button"
                        >
                            Forgot password?
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Forgot Password</DialogTitle>
                            <DialogDescription>
                                Enter your email below and we'll send you a reset verification code
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="focus:!ring-0 h-10 selection:bg-blue-400"
                                />

                            </div>

                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className="w-20 bg-blue-400 hover:bg-blue-500 text-white" type="submit">Send</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default ForgotPassword