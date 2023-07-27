import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { caseId: string } }
) {
  try {
    const caseItem = await prismadb.case.findUnique({
      where: { id: params.caseId },
    });

    return NextResponse.json(caseItem);
  } catch (error) {
    console.log("[CASE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; caseId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, material } = await body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!material) {
      return new NextResponse("Material is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const caseItem = await prismadb.case.updateMany({
      where: { id: params.caseId },
      data: { name, material },
    });

    return NextResponse.json(caseItem);
  } catch (error) {
    console.log("[CASE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; caseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.caseId) {
      return new NextResponse("case ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const caseItem = await prismadb.case.deleteMany({
      where: { id: params.caseId },
    });

    return NextResponse.json(caseItem);
  } catch (error) {
    console.log("[CASE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
