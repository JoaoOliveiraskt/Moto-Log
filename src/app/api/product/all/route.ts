import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const withDiscount = searchParams.get("withDiscount") === "true";
    const categoryId = searchParams.get("categoryId");
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const bestSellers = searchParams.get("bestSellers") === "true";
    const sortBy = searchParams.get("sortBy");

    const products = await db.produto.findMany({
      include: {
        loja: {
          select: {
            nome: true,
            id: true,
            profileImageUrl: true,
            descricao: true,
          },
        },
        categoria: { select: { nome: true, id: true } },
      },
      where: {
        status: "ATIVO",
        estoque: { gt: 0 },
        ...(withDiscount && { porcentagemDesconto: { gt: 0 } }),
        ...(categoryId && { categoriaId: categoryId }),
        ...(bestSellers && { totalVendido: { gt: 0 } }),
      },
      orderBy: {
        ...(bestSellers
          ? { totalVendido: "desc" }
          : withDiscount
          ? { porcentagemDesconto: "desc" }
          : sortBy === "recent"
          ? { createdAt: "desc" }
          : { createdAt: "desc" }),
      },
      ...(limit && { take: limit }),
    });

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao buscar produtos",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
