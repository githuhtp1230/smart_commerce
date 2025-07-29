import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import type { IAttributeValue } from "@/type/attribute";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";

interface Props {
  attributevalues: IAttributeValue[];
}

const AttributeValuesTable = ({ attributevalues }: Props) => {
  const columns: ColumnDef<IAttributeValue>[] = [
    {
      accessorKey: "id",
      header: () => <div>Id</div>,
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "attribute",
      header: () => <div>Attribute</div>,
      cell: ({ row }) => {
        return <div>{row.original.attribute?.name}</div>;
      },
    },
    {
      accessorKey: "value",
      header: () => <div>Value</div>,
      cell: ({ row }) => {
        return <div>{row.original.value}</div>;
      },
    },
    {
      id: "deleteAction",
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
      id: "updateAction",
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
      <DataTable columns={columns} data={attributevalues} />
    </div>
  );
};

export default AttributeValuesTable;
