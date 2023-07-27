"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type PlateColumn = {
  id: string;
  name: string;
  material: string;
  createdAt: string;
};

export const columns: ColumnDef<PlateColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "material",
    header: "Material",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
