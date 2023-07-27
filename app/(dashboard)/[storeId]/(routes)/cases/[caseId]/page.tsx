import prismadb from "@/lib/prismadb";
import CaseForm from "./components/case-form";

const CasePage = async ({ params }: { params: { caseId: string } }) => {
  const caseItem = await prismadb.case.findUnique({
    where: { id: params.caseId },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CaseForm initialData={caseItem} />
      </div>
    </div>
  );
};

export default CasePage;
