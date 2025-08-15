"use client";

import { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Mail, Phone, Shield } from "lucide-react";
import type { IUser } from "@/type/auth";

interface PermissionItem {
  name: string;
  members: number;
  enabled: boolean;
}

interface OrderItem {
  id: string;
  date: string;
  total: string;
  status: string;
  deliveryMethod: string;
}

interface EmployeePermissionsDialogProps {
  user: IUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EmployeePermissionsDialog({
  user,
  open,
  onOpenChange,
}: EmployeePermissionsDialogProps) {
  const [activeTab, setActiveTab] = useState<"History Orders" | "Permissions">(
    "Permissions"
  );

  const [permissions, setPermissions] = useState<PermissionItem[]>([
    { name: "Xem danh sách người dùng", members: 3, enabled: true },
    { name: "Thêm mới người dùng", members: 3, enabled: false },
    { name: "Cập nhật người dùng", members: 4, enabled: false },
    { name: "Xóa người dùng", members: 2, enabled: true },
    { name: "Xem thống kê", members: 3, enabled: false },
  ]);

  const [orders] = useState<OrderItem[]>([
    {
      id: "ORD001",
      date: "2025-08-10",
      total: "1200",
      status: "SHIPPED",
      deliveryMethod: "Standard",
    },
    {
      id: "ORD002",
      date: "2025-08-11",
      total: "850",
      status: "READY TO PICKUP",
      deliveryMethod: "Pickup",
    },
  ]);

  const togglePermission = (index: number) => {
    setPermissions((prev) =>
      prev.map((p, i) => (i === index ? { ...p, enabled: !p.enabled } : p))
    );
  };

  // Reset tab when user changes
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
        </DialogHeader>

        {user ? (
          <>
            {/* Profile */}
            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar || "https://i.pravatar.cc/80"}
                  alt="avatar"
                  className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {user.name}
                    </h2>
                    <Select defaultValue={user.isActive ? "active" : "locked"}>
                      <SelectTrigger className="w-[140px] h-7 rounded-full border border-gray-300 text-xs">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          <span className="flex items-center gap-1 text-green-700">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Hoạt động
                          </span>
                        </SelectItem>
                        <SelectItem value="locked">
                          <span className="flex items-center gap-1 text-red-700">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            Đã khóa
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="text-sm text-gray-500">Role: {user.role}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
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

            {/* Tab Content */}
            {activeTab === "History Orders" && (
              <div className="mt-4">
                <Card>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Delivery Method</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>#{order.id}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{order.deliveryMethod}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>${order.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "Permissions" && (
              <div className="mt-4 space-y-4">
                <Card>
                  <CardHeader className="pb-2 border-b">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-blue-600">
                      <Shield className="w-5 h-5" /> Permissions Settings
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Manage access rights for this user
                    </p>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 pt-2">
                    {permissions.map((perm, index) => (
                      <div
                        key={perm.name}
                        className="flex items-center justify-between p-3 rounded-xl border bg-white hover:bg-blue-50 transition-all duration-300"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {perm.name}
                        </span>
                        <Switch
                          checked={perm.enabled}
                          onCheckedChange={() => togglePermission(index)}
                          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        ) : (
          <p>No user selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
