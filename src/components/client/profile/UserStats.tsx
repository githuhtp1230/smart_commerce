import React from "react";
import { Separator } from "@/components/ui/separator";

const UserStats: React.FC = () => {
  return (
    <>
      <Separator className="w-full my-6 mb-0 mt-13" />
      <div className="grid grid-cols-3 gap-12 mt-0">
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
          <p className="text-xl font-semibold text-secondary-foreground">
            1 week ago
          </p>
        </div>
        <div className="space-y-2 ml-30">
          <h6 className="text-sm font-medium text-muted-foreground">
            Total Orders
          </h6>
          <p className="text-xl font-semibold text-secondary-foreground">97</p>
        </div>
      </div>
    </>
  );
};

export default UserStats;
