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
    console.error("Erro ao buscar seguidores da loja:", error);
    return NextResponse.json(
      { error: "Erro ao buscar seguidores da loja" },
      { status: 500 }
    );
  }
}
