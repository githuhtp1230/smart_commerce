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
  { label: "Tất cả", key: "all" },
  { label: "Khách hàng", key: "customer" },
  { label: "Thành viên", key: "membership" },
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
        className="w-full px-4"
      >
        <TabsList className="w-full p-0 justify-start border-b rounded-none">
          {tabs.map((tab) => (
            <CustomTabsTrigger key={tab.key} value={tab.key} className="">
              <p className="text-[15px]">{tab.label}</p>
            </CustomTabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            <UsersTable users={users} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ManageUsersPage;
