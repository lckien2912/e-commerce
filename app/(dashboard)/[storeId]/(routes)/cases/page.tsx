import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import CaseClient from "./components/case-client";
import { CaseColumn } from "./components/columns";

const CasesPage = async ({ params }: { params: { storeId: string } }) => {
  const cases = await prismadb.case.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedCases: CaseColumn[] = cases.map((item) => ({
    id: item.id,
    name: item.name,
    material: item.material,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CaseClient data={formattedCases} />
      </div>
    </div>
  );
};

export default CasesPage;
