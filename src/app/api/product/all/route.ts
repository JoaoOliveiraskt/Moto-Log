import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const withDiscount = searchParams.get("withDiscount") === "true";
  const categoryId = searchParams.get("categoryId");
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  try {
    const response = await db.produto.findMany({
      include: {
        loja: {
          select: { nome: true, id: true, imagemUrl: true },
        },
        categoria: { select: { nome: true, id: true } },
      },
      where: {
        status: "ATIVO",
        estoque: { gt: 0 },
        ...(withDiscount && { porcentagemDesconto: { gt: 0 } }),
        ...(categoryId && { categoriaId: categoryId }),
      },
      orderBy: { createdAt: "desc" },
      ...(limit && { take: limit }),
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
