import prismadb from "@/lib/prismadb";
import PlateForm from "./components/plate-form";

const PlatePage = async ({ params }: { params: { plateId: string } }) => {
  const plate = await prismadb.plate.findUnique({
    where: { id: params.plateId },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlateForm initialData={plate} />
      </div>
    </div>
  );
};

export default PlatePage;
