"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { IUser } from "@/type/auth";
import OrdersTable from "./OrdersTable";
import ProfileUser from "./ProfileUser";
import PermissionCard from "./PermissionCard";
import { DialogDescription } from "@radix-ui/react-dialog";

interface EmployeePermissionsDialogProps {
  user: IUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PermissionItem {
  name: string;
  enabled: boolean;
}

function EmployeePermissionsDialog({
  user,
  open,
  onOpenChange,
}: EmployeePermissionsDialogProps) {
  const [activeTab, setActiveTab] = useState<"History Orders" | "Permissions">(
    "Permissions"
  );

  const [permissions, setPermissions] = useState<PermissionItem[]>([
    { name: "Xem danh sách người dùng", enabled: true },
    { name: "Thêm mới người dùng", enabled: false },
    { name: "Cập nhật người dùng", enabled: false },
    { name: "Xóa người dùng", enabled: true },
    { name: "Xem thống kê", enabled: false },
  ]);

  const togglePermission = (index: number) => {
    setPermissions((prev) =>
      prev.map((p, i) => (i === index ? { ...p, enabled: !p.enabled } : p))
    );
  };

  useEffect(() => {
    setActiveTab("Permissions");
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "!w-[80vw] !h-[90vh] !max-w-none !max-h-none",
          "overflow-y-auto p-6 bg-gray-50 rounded-lg shadow-xl"
        )}
      >
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
          <DialogDescription>
            View and manage employee permissions and order history
          </DialogDescription>
        </DialogHeader>

        {user ? (
          <>
            <ProfileUser user={user} />

            <div className="flex border-b mt-4">
              {["History Orders", "Permissions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab as "History Orders" | "Permissions")
                  }
                  className={cn(
                    "px-4 py-2 text-sm font-medium",
                    activeTab === tab
                      ? "border-b-4 border-green-500 text-green-600"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Lấy lịch sử order theo userId */}
            {activeTab === "History Orders" && user && (
              <OrdersTable userId={user.id} />
            )}

            {/* Tab Permissions */}
            {activeTab === "Permissions" && (
              <PermissionCard
                permissions={permissions}
                togglePermission={togglePermission}
              />
            )}
          </>
        ) : (
          <p>No user selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EmployeePermissionsDialog;
