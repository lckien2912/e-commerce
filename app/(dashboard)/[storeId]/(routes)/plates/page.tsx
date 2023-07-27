import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import PlateClient from "./components/plate-client";
import { PlateColumn } from "./components/columns";

const PlatesPage = async ({ params }: { params: { storeId: string } }) => {
  const plates = await prismadb.plate.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedPlates: PlateColumn[] = plates.map((item) => ({
    id: item.id,
    name: item.name,
    material: item.material,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlateClient data={formattedPlates} />
      </div>
    </div>
  );
};

export default PlatesPage;
