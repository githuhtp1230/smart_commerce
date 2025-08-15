import { DataTable } from '@/components/common/table/DataTable';
import type { IUser } from '@/type/auth';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { EllipsisVertical } from 'lucide-react';
import { AppBadge } from '@/components/common/badge/AppBadge';
import RoleBadge from '@/components/common/badge/RoleBadge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Props {
    users: IUser[];
}
const UsersTable = ({ users }: Props) => {
    const columns: ColumnDef<IUser>[] = [
        {
            accessorKey: "id",
            header: () => <div>Id</div>,
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },
        {
            accessorKey: "email",
            header: () => <div>Email</div>,
            cell: ({ row }) => {
                return <div >{row.original.email}</div>;
            },
        },
        {
            accessorKey: "name",
            header: () => <div>Name</div>,
            cell: ({ row }) => {
                return <div>{row.original.name}</div>;
            },
        },
        {
            accessorKey: "phone",
            header: () => <div>Phone</div>,
            cell: ({ row }) => {
                return <div>{row.original.phone}</div>;
            },
        },
        {
            accessorKey: "role",
            header: () => <div>Role</div>,
            cell: ({ row }) => {
                type roleKey = "admin" | "manage" | "user";
                const role = (row.original.role ?? "user").toLowerCase() as roleKey;

                return (
                    <RoleBadge
                        badgeColor={role}
                        content={row.original.role}
                    />
                );
            },
        },
        {
            accessorKey: "isActive",
            header: () => <div>User Status</div>,
            cell: ({ row }) => {
                const isActive = row.original.isActive;
                return (
                    <div>
                        {isActive ? <AppBadge badgeColor="green" content={'Hoạt động'} /> : <AppBadge badgeColor="red" content={'Đã khóa'} />}
                    </div>
                );
            },
        },

        {
            id: "updateAction",
            header: () => <div>Action</div>,
            cell: () => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                            >
                                Update
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <div className="bg-primary rounded-xl ">
            <DataTable columns={columns} data={users} />

        </div>
    );
};

export default UsersTable;
