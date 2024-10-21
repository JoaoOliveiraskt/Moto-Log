import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const categories = await db.categoria.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { message: "Erro ao buscar categorias", error },
      { status: 500 }
    );
  }
}
