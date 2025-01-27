import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ isFavorited: false });
    }

    const favorite = await db.favorite.findFirst({
      where: {
        userId: session.user.id as string,
        productId: params.productId,
      },
    });

    return NextResponse.json({ isFavorited: !!favorite });
  } catch (error: any) {
    console.error("Error checking favorite status:", error);
    return NextResponse.json({ isFavorited: false });
  }
}
