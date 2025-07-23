import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import type { IPromotion } from "@/type/promotion";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";

interface Props {
  promotions: IPromotion[];
}

const PromotionsTable = ({ promotions }: Props) => {
  const columns: ColumnDef<IPromotion>[] = [
    {
      accessorKey: "id",
      header: () => <div>Id</div>,
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "description",
      header: () => <div>description</div>,
      cell: ({ row }) => {
        return <div>{row.original.description}</div>;
      },
    },
    {
      accessorKey: "discountValuePercent",
      header: () => <div>discountValuePercent</div>,
      cell: ({ row }) => {
        return <div>{row.original.discountValuePercent}</div>;
      },
    },
    {
      accessorKey: "startDate",
      header: () => <div>startDate</div>,
      cell: ({ row }) => {
        return <div>{row.original.startDate}</div>;
      },
    },
    {
      accessorKey: "endDate",
      header: () => <div>endDate</div>,
      cell: ({ row }) => {
        return <div>{row.original.endDate}</div>;
      },
    },
    {
      id: "actions",
      header: () => <div>Delete</div>,
      cell: () => {
        return (
          <Button variant="ghost">
            <Trash2 className="text-icon-system-danger" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: () => <div>Update</div>,
      cell: () => {
        return (
          <Button variant="ghost">
            <SquarePen className="text-icon-brand-primary" />
          </Button>
        );
      },
    },
  ];

  return (
    <div className="bg-primary rounded-xl p-3">
      <DataTable columns={columns} data={promotions} />
    </div>
  );
};

export default PromotionsTable;
