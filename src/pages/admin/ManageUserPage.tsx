import { useEffect, useState } from 'react';
import { DataTable } from '@/components/common/table/DataTable';
import type { IUser } from '@/type/auth';
import type { ColumnDef } from '@tanstack/react-table';
import { fetchUsers } from '@/services/users.service';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';

const ManageUserPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                console.error("Lỗi khi fetch users:", err);
            }
        };

        getUsers();
    }, []);

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
                return <div> {row.original.role}</div >;
            },
        },
        {
            accessorKey: "deleteAction",
            header: () => <div>Delete</div>,
            cell: () => {
                return (
                    <Button
                        variant="ghost"
                    >
                        <Trash2 className="text-icon-system-danger" />
                    </Button>
                );
            },
        },
        {
            id: "updateAction",
            header: () => <div>Update</div>,
            cell: () => {
                return (
                    <Button
                        variant="ghost"
                    >
                        <SquarePen className="text-icon-brand-primary" />
                    </Button>
                );
            },
        },
    ];

    return (
        <div className="bg-primary rounded-xl p-3 ">
            <Button className="bg-blue-500 hover:bg-blue-600 mt-5 mb-5">Thêm mới người dùng</Button>
            <DataTable columns={columns} data={users} />
        </div>
    );
};

export default ManageUserPage;
