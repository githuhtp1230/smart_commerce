"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import type { IUser } from "@/type/auth";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilLineIcon, Ellipsis, Lock, Unlock, User } from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye } from "@/assets/icons";
import { AppBadge } from "@/components/common/badge/AppBadge";
import RoleBadge from "@/components/common/badge/RoleBadge";
import EditUserDialog from "./EditUserDialog";
import { useMutation } from "@tanstack/react-query";
import { toastSuccess, toastError } from "@/components/common/sonner";
import { toggleIsActiveUser } from "@/services/users.service";
import EmployeePermissionsDialog from "./EmployeePermissionsDialog";


interface Props {
  users: IUser[];
  onUserUpdated?: (user: IUser) => void;
  onUserAdded?: (user: IUser) => void;
}

const UsersTable = ({ users, onUserUpdated }: Props) => {
  const [userList, setUserList] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const { mutate: toggleUser } = useMutation<IUser, Error, number>({
    mutationFn: (userId: number) => toggleIsActiveUser(userId),
    onSuccess: (updatedUser) => {
      toastSuccess("Cập nhật trạng thái thành công");
      setUserList((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      onUserUpdated?.(updatedUser);
    },
    onError: (error: unknown) => {
      toastError(error instanceof Error ? error.message : "Có lỗi xảy ra");
    },
  });

  const columns: ColumnDef<IUser>[] = [
    { accessorKey: "id", header: "Id", cell: ({ row }) => row.index + 1 },
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) => {
        const avatarUrl = row.original.avatar?.trim();
        return avatarUrl ? (
          <img
            src={avatarUrl}
            alt={row.original.name}
            className="w-10 h-10 rounded-full object-contain"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500" />
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.original.phone,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        type RoleKey = "admin" | "manage" | "user";
        const role = (row.original.role ?? "user").toLowerCase() as RoleKey;
        return <RoleBadge badgeColor={role} content={row.original.role} />;
      },
    },
    {
      accessorKey: "isActive",
      header: "User Status",
      cell: ({ row }) => (
        <AppBadge
          badgeColor={row.original.isActive ? "green" : "red"}
          content={row.original.isActive ? "Hoạt động" : "Đã khóa"}
        />
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-bold">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUser(user);
                  setDialogOpen(true);
                }}
              >
                <Eye className="size-3.5" /> Preview
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setEditingUser(user);
                  setEditDialogOpen(true);
                }}
              >
                <PencilLineIcon className="size-3.5" /> Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => toggleUser(user.id)}
              >
                {user.isActive ? (
                  <>
                    <Lock className="w-4 h-4 text-red-500" />
                    <span className="text-red-600 font-medium">
                      lock account
                    </span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-medium">
                      unlock account
                    </span>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="bg-primary rounded-xl p-3 space-y-4">
      <DataTable columns={columns} data={userList} />

      {selectedUser && (
        <EmployeePermissionsDialog
          user={selectedUser}
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setSelectedUser(null); // reset user khi đóng
          }}
        />
      )}

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          isOpen={editDialogOpen}
          setIsOpen={setEditDialogOpen}
          onUserUpdated={(updatedUser) => {
            setUserList((prev) =>
              prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UsersTable;
