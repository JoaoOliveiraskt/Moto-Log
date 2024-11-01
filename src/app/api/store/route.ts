import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const takeParam = url.searchParams.get("take");
  const take = takeParam ? parseInt(takeParam, 10) : undefined;
  try {

    const stores = await db.loja.findMany({
      select: {
        id: true,
        nome: true,
        imagemUrl: true,
      },
      ...(take && { take }),
      orderBy: {
        createdAt: "asc",
      }
    });
    return NextResponse.json(stores, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar lojas:", error);
    return NextResponse.json(
      { message: "Erro ao buscar lojas", error },
      { status: 500 }
    );
  }
}