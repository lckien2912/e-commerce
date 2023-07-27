import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, material } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!material) {
      return new NextResponse("Material is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const plate = await prismadb.plate.create({
      data: {
        name,
        material,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(plate);
  } catch (error) {
    console.log("[PLATES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const plates = await prismadb.plate.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(plates);
  } catch (error) {
    console.log("[PLATES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
