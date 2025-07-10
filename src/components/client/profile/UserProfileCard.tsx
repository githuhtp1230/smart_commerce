import React from 'react'
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
const UserProfileCard = () => {
    return (
        <Card className="col-span-2 p-6 bg-primary">
            <div className="flex items-start gap-6">
                <Avatar className="h-40 w-40">
                    <AvatarImage
                        src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20smiling%20Asian%20man%20in%20his%2030s%20wearing%20a%20light%20blue%20button-up%20shirt%20against%20a%20neutral%20dark%20green%20background%2C%20business%20headshot%20with%20soft%20lighting%2C%20high%20quality%20professional%20photo&width=300&height=300&seq=1&orientation=squarish"
                        alt="Ansolo Lazinatov"
                    />
                    <AvatarFallback className="text-2xl">AL</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4 mt-10">
                    <div>
                        <h2 className="text-2xl font-semibold text-secondary-foreground">
                            Ansolo Lazinatov
                        </h2>
                        <p className="text-muted-foreground">Joined 3 months ago</p>
                    </div>
                </div>
            </div>
            <Separator className="w-full  my-6 mb-0 mt-13" />
            <div className="grid grid-cols-3 gap-12 mt-0 ">
                <div className="space-y-2">
                    <h6 className="text-sm font-medium text-muted-foreground">
                        Total Spent
                    </h6>
                    <h4 className="text-xl font-semibold text-secondary-foreground">
                        18,800,000 VNĐ
                    </h4>
                </div>
                <div className="space-y-2">
                    <h6 className="text-sm font-medium text-muted-foreground">
                        Last Order
                    </h6>
                    <p className="text-xl font-semibold text-secondary-foreground ">
                        1 week ago
                    </p>
                </div>
                <div className="space-y-2 ml-30">
                    <h6 className="text-sm font-medium text-muted-foreground">
                        Total Orders
                    </h6>
                    <p className="text-xl font-semibold text-secondary-foreground">
                        97
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default UserProfileCard