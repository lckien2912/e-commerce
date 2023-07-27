"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlateColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface PlateClientProps {
  data: PlateColumn[];
}

const PlateClient: React.FC<PlateClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Heading
          title={`Plate (${data.length})`}
          description="Manage plates for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/plates/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Plates" />
      <Separator />
      <ApiList entityName="plates" entityIdName="plateId" />
    </>
  );
};

export default PlateClient;
