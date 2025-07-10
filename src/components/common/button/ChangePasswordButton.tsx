import React from 'react'
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
import { Button } from "@/components/ui/button"
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
const ChangePasswordButton = () => {
    const [showCurrentPassword, setCurrentShowPassword] = useState(false);
    const [showNewPassword, setNewShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center space-x-2 whitespace-nowrap cursor-pointer !rounded-button"
                    >
                        <KeyRound />
                        <span>Change password</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Current Password</Label>
                            <div className="relative">
                                <Input type={showCurrentPassword ? "text" : "password"} id="name-1" name="currentPassword" placeholder="Type the current password" />
                                <button
                                    type="button"
                                    onClick={() => setCurrentShowPassword((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showCurrentPassword ? <Eye /> : <EyeOff />}
                                </button>
                            </div>


                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">New Password</Label>
                            <div className="relative">
                                <Input type={showNewPassword ? "text" : "password"} name="newPassword" placeholder="Type new password" />
                                <button
                                    type="button"
                                    onClick={() => setNewShowPassword((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showNewPassword ? <Eye /> : <EyeOff />}
                                </button>
                            </div>

                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Confirm Password</Label>
                            <div className="relative">
                                <Input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Type confirm password" />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                                </button>
                            </div>

                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="outline" type="submit">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>


    )
}

export default ChangePasswordButton;
