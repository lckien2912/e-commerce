"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <Heading
        title={`Order (${data.length})`}
        description="Manage Orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
