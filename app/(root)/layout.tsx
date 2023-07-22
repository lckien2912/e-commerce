import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";

const SetupLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) redirectToSignIn();

  const store = await prismadb.store.findFirst({
    where: { userId: userId || undefined },
  });

  if (store) redirect(`/${store.id}`);

  return <div>{children}</div>;
};

export default SetupLayout;
