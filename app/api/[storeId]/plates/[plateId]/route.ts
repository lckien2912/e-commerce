import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { plateId: string } }
) {
  try {
    const plate = await prismadb.plate.findUnique({
      where: { id: params.plateId },
    });

    return NextResponse.json(plate);
  } catch (error) {
    console.log("[PLATE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; plateId: string } }
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

    const plate = await prismadb.plate.updateMany({
      where: { id: params.plateId },
      data: { name, material },
    });

    return NextResponse.json(plate);
  } catch (error) {
    console.log("[PLATE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; plateId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.plateId) {
      return new NextResponse("plate ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const plate = await prismadb.plate.deleteMany({
      where: { id: params.plateId },
    });

    return NextResponse.json(plate);
  } catch (error) {
    console.log("[PLATE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
