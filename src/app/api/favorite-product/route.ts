import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession();
  const { productId } = await request.json();


  if (!productId) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const favorite = await db.favorite.create({
    data: {
      userId: session.user.id as string,
      productId,
    },
  });

  return NextResponse.json(favorite);
}

export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await request.json();

  if (!productId) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  const deletedFavorite = await db.favorite.deleteMany({
    where: {
      userId: session.user.id,
      productId,
    },
  });

  return NextResponse.json(deletedFavorite);
}
