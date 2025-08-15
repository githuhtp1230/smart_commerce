import {
  fetchCustomer,
  fetchMembership,
  fetchUsers,
} from "@/services/users.service";
import type { IUser } from "@/type/auth";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import UsersTable from "../../components/admin/users/UsersTable";
import CustomTabsTrigger from "@/components/common/tabs/CustomTabsTrigger";

const tabs = [
  { label: "All", key: "all" },
  { label: "Customer", key: "customer" },
  { label: "Member", key: "membership" },
];

const ManageUsersPage = () => {
  const [tabValue, setTabValue] = useState("all");
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tabValue === "all") {
          setUsers(await fetchUsers());
        } else if (tabValue === "customer") {
          setUsers(await fetchCustomer());
        } else if (tabValue === "membership") {
          setUsers(await fetchMembership());
        }
      } catch (error) {
        console.error("Lỗi khi lấy người dùng:", error);
      }
    };
    fetchData();
  }, [tabValue]);
  return (
    <div>
      <Tabs
        defaultValue="false"
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
          <TabsContent key={tab.key} value={tab.key} className="mt-4" >
            <UsersTable users={users} />

          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ManageUsersPage;
