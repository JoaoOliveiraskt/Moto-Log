import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, storeId } = await req.json();

  try {
    const existingFollow = await db.follows.findFirst({
      where: {
        userId,
        storeId,
      },
    });

    if (!existingFollow) {
      return NextResponse.json(
        { error: "Not following store" },
        { status: 400 }
      );
    }

    await db.follows.delete({
      where: {
        id: existingFollow.id,
      },
    });

    return NextResponse.json({ message: "Deixou de seguir com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error to unfollow store" },
      { status: 500 }
    );
  }
}
