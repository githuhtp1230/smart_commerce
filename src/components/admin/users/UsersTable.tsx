import { useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import type { IUser } from "@/type/auth";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilLineIcon, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, PencilIcon } from "@/assets/icons";
import { Ellipsis } from "lucide-react";
import { AppBadge } from "@/components/common/badge/AppBadge";
import RoleBadge from "@/components/common/badge/RoleBadge";
import EmployeePermissionsDialog from "@/components/client/home/ProductList";

interface Props {
  users: IUser[];
}

const UsersTable = ({ users }: Props) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "id",
      header: () => <div>Id</div>,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "email",
      header: () => <div>Email</div>,
      cell: ({ row }) => <div>{row.original.email}</div>,
    },
    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "phone",
      header: () => <div>Phone</div>,
      cell: ({ row }) => <div>{row.original.phone}</div>,
    },
    {
      accessorKey: "role",
      header: () => <div>Role</div>,
      cell: ({ row }) => {
        type roleKey = "admin" | "manage" | "user";
        const role = (row.original.role ?? "user").toLowerCase() as roleKey;
        return <RoleBadge badgeColor={role} content={row.original.role} />;
      },
    },
    {
      accessorKey: "isActive",
      header: () => <div>User Status</div>,
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <div>
            {isActive ? (
              <AppBadge badgeColor="green" content={"Hoạt động"} />
            ) : (
              <AppBadge badgeColor="red" content={"Đã khóa"} />
            )}
          </div>
        );
      },
    },

    {
      id: "updateAction",
      header: () => <div></div>,
      cell: () => {
        return (
          <div className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="font-bold">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    // setSelectedUser();
                    console.log("hello");
                    setDialogOpen(true);
                  }}
                >
                  <Eye className="size-3.5" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <PencilLineIcon className="size-3.5" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                  <Trash2 className="size-3.5 text-red-600 focus:text-red-600 " />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-primary rounded-xl p-3">
      <DataTable columns={columns} data={users} />

      {/* Dialog hiển thị chi tiết người dùng */}
      <EmployeePermissionsDialog
        user={selectedUser}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default UsersTable;
