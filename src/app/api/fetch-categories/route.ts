import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const categories = await db.categoria.findMany({
      include: {
        produtos: {
          select: {
            id: true,
            nome: true,
            categoria: true,
            preco: true,
            porcentagemDesconto: true,
            imagemUrl: true,
            loja: true,
            lojaId: true,
          },
        },
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar categorias", error },
      { status: 500 }
    );
  }
}
