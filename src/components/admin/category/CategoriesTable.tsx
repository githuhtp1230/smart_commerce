import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import type { ICategory } from "@/type/category";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";


interface Props {
    categories: ICategory[];
}

const CategoriesTable = ({ categories }: Props) => {
    const columns: ColumnDef<ICategory>[] = [
        {
            accessorKey: "id",
            header: () => <div>Id</div>,
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
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
            id: "deleteAction",
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
        <div className="bg-primary rounded-xl p-3">
            <DataTable columns={columns} data={categories} />
        </div>
    );
};

export default CategoriesTable;
