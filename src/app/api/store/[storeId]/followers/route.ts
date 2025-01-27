import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { storeId } = params;

  try {
    const storeFollowers = await db.follows.count({
      where: {
        storeId,
      },
    });
    return NextResponse.json({ followers: storeFollowers });
  } catch (error) {
    console.error("Error fetching store followers:", error);
    return NextResponse.json(
      { error: "Error fetching store followers" },
      { status: 500 }
    );
  }
}
