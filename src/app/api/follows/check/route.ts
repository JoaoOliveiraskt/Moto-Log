import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(req: Request) {
  const { userId, storeId } = req.url.includes("?")
    ? Object.fromEntries(new URL(req.url).searchParams)
    : {};

  if (!userId || !storeId) {
    return NextResponse.json(
      { error: "UserId and StoreId are required" },
      { status: 400 }
    );
  }

  try {
    const existingFollow = await db.follows.findFirst({
      where: {
        userId,
        storeId,
      },
    });

    return NextResponse.json({
      isFollowing: !!existingFollow,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error checking follow" },
      { status: 500 }
    );
  }
}
