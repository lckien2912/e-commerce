import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import Navbar from "@/components/navbar";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storedId: string };
}) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: { id: params.storedId, userId: userId || undefined },
  });

  if (!store) redirect("/");

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
