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
          "!w-[65vw] !h-[75vh] !max-w-none !max-h-none",
          "overflow-y-auto p-6 bg-background-primary rounded-xl shadow-xl"
        )}
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-txt-primary">
            Employee Details
          </DialogTitle>
          <DialogDescription className="text-sm text-txt-primary mt-1">
            View and manage employee permissions and order history
          </DialogDescription>
        </DialogHeader>

        {user ? (
          <>
            {/* Profile */}
            <div className="mb-4">
              <ProfileUser user={user} />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              {["History Orders", "Permissions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab as "History Orders" | "Permissions")
                  }
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-all",
                    activeTab === tab
                      ? "border-b-4 border-green-500 text-green-600"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[250px]">
              {activeTab === "History Orders" && <OrdersTable />}

              {activeTab === "Permissions" && (
                <div className="grid grid-cols-2 gap-3">
                  {permissions.map((p, index) => (
                    <div
                      key={p.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:shadow-sm transition"
                    >
                      <span className="text-gray-700 text-sm">{p.name}</span>
                      <button
                        onClick={() => togglePermission(index)}
                        className={cn(
                          "w-9 h-4 rounded-full p-0.5 transition-colors",
                          p.enabled ? "bg-green-500" : "bg-gray-300"
                        )}
                      >
                        <span
                          className={cn(
                            "block w-3.5 h-3.5 bg-white rounded-full shadow transform transition-transform",
                            p.enabled ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500">No user selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EmployeePermissionsDialog;
