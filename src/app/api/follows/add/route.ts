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

    if (existingFollow) {
      return NextResponse.json(
        { error: "Already following store" },
        { status: 400 }
      );
    }

    await db.follows.create({
      data: {
        userId,
        storeId,
      },
    });

    return NextResponse.json({ message: "Seguindo com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error to follow store" },
      { status: 500 }
    );
  }
}
