import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.produto.findMany({
      include: {
        loja: {
          select: { nome: true, id: true, descricao: true, imagemUrl: true },
        },
        categoria: { select: { nome: true, id: true } },
      },
      where: { status: "ATIVO" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar produtos: ", error);
    return NextResponse.json(
      { message: "Erro ao buscar produtos ", error },
      { status: 500 }
    );
  }
}
