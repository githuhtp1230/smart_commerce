import React, { useState } from 'react'
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";


const UserContactCard = () => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [contactInfo, setContactInfo] = useState({
        address: "Vancouver, British Columbia\nCanada",
        email: "shatinon@jeemail.com",
        phone: "+1234567890",
    });
    const [editForm, setEditForm] = useState(contactInfo);

    const handleSave = () => {
        setContactInfo(editForm);
        setIsEditDialogOpen(false);
    };
    return (
        <Card className="p-6 rounded-md shadow bg-primary">
            <div className="flex items-center justify-between ">
                <h2 className="text-lg font-semibold text-secondary-foreground">
                    Contact Information
                </h2>
                <button
                    id="editContactBtn"
                    className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
                    onClick={() => setIsEditDialogOpen(true)}
                >
                    <Pencil className="w-4 h-4" />
                </button>
            </div>
            <Separator className="my-4 " />

            {/* --- Contact Info Display --- */}
            <div className="space-y-2 mt-0">
                <div>
                    <div className="flex gap-20 mb-20">
                        <h3 className=" font-medium text-secondary-foreground">
                            Address
                        </h3>
                        <p className="text-popover-foreground whitespace-pre-line">
                            {contactInfo.address}
                        </p>
                    </div>
                </div>

                <Separator className="my-4 " />
                <div>
                    <div className="flex items-center gap-40">
                        <h3 className=" font-medium text-secondary-foreground ">
                            Email
                        </h3>
                        <p className="text-txt-brand">{contactInfo.email}</p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-55">
                        <h3 className="font-medium text-secondary-foreground">
                            Phone
                        </h3>
                        <p className="text-txt-brand">{contactInfo.phone}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default UserContactCard