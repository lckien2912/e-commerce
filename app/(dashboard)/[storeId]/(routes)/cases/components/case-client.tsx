"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CaseColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface CaseClientProps {
  data: CaseColumn[];
}

const CaseClient: React.FC<CaseClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Heading
          title={`Case (${data.length})`}
          description="Manage cases for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/cases/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Cases" />
      <Separator />
      <ApiList entityName="cases" entityIdName="caseId" />
    </>
  );
};

export default CaseClient;
