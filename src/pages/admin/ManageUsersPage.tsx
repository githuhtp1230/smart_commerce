"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import UsersTable from "../../components/admin/users/UsersTable";
import CustomTabsTrigger from "@/components/common/tabs/CustomTabsTrigger";
import AddUserForm from "@/components/admin/users/AddUserForm";
import {
  fetchCustomer,
  fetchMembership,
  fetchUsers,
} from "@/services/users.service";
import type { IUser } from "@/type/auth";

const tabs = [
  { label: "All", key: "all" },
  { label: "Customer", key: "customer" },
  { label: "Member", key: "membership" },
];

export default function ManageUsersPage() {
  const [tabValue, setTabValue] = useState("all");
  const [users, setUsers] = useState<IUser[]>([]);

  // Lấy dữ liệu theo tab
  const fetchData = async (tab: string) => {
    try {
      let data: IUser[] = [];
      if (tab === "all") data = await fetchUsers();
      else if (tab === "customer") data = await fetchCustomer();
      else if (tab === "membership") data = await fetchMembership();
      setUsers(data);
    } catch (error) {
      console.error("Lỗi khi lấy người dùng:", error);
    }
  };

  useEffect(() => {
    fetchData(tabValue);
  }, [tabValue]);

  // Callback khi thêm user mới
  const handleUserAdded = (newUser: IUser) => {
    setUsers((prev) => [newUser, ...prev]); // luôn đưa lên đầu
  };

  // Callback khi update user (edit hoặc toggle)
  const handleUserUpdated = (updatedUser: IUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  return (
    <div className="space-y-3">
      {/* Form thêm user */}
      <AddUserForm onUserAdded={handleUserAdded} />

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onValueChange={setTabValue}
        className="w-full px-4 gap-0"
      >
        <TabsList className="p-0 justify-start">
          {tabs.map((tab) => (
            <CustomTabsTrigger key={tab.key} value={tab.key}>
              <p className="text-[15px]">{tab.label}</p>
            </CustomTabsTrigger>
          ))}
        </TabsList>

        <div className="border border-b-border-primary mt-[3px] !h-[1px]"></div>

        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="mt-4">
            <UsersTable users={users} onUserUpdated={handleUserUpdated} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
