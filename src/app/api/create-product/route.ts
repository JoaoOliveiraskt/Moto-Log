import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { z, ZodError } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ProdutoStatus } from "prisma/generated/client";
import { revalidatePath } from "next/cache";

const createProductSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório").max(100),
  description: z.string().max(200).optional(),
  imageUrl: z.string().url("A URL da imagem deve ser válida"),
  price: z.number().min(0.01, "O preço deve ser maior que zero"),
  discountPercentage: z.number().optional(),
  color: z.string(),
  size: z.string(),
  stock: z.number().int().min(0, "O estoque deve ser maior ou igual a zero"),
  categoryId: z.string(),
  status: z.enum([ProdutoStatus.ATIVO, ProdutoStatus.ARQUIVADO]),
});

const handleErrorResponse = (error: unknown) => {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Validação falhou", issues: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { error: "Erro ao criar o produto", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
};

const generateSKU = async (tx: any): Promise<string> => {
  const lastProduct = await tx.produto.findFirst({
    orderBy: { createdAt: "desc" },
  });
  const nextSKU = lastProduct
    ? `PROD-${parseInt(lastProduct.sku.split("-")[1]) + 1}`
    : "PROD-001";
  return nextSKU;
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userStore = await db.loja.findFirst({
      where: { userId: userId },
    });

    if (!userStore) {
      return NextResponse.json(
        { error: "Loja não encontrada para este usuário" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const data = createProductSchema.parse(body);

    const category = await db.categoria.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }

    const product = await db.$transaction(async (tx) => {
      const sku = await generateSKU(tx);

      return tx.produto.create({
        data: {
          nome: data.name,
          sku,
          descricao: data.description || "",
          imagemUrl: data.imageUrl,
          preco: data.price,
          porcentagemDesconto: data.discountPercentage,
          lojaId: userStore.id,
          categoriaId: data.categoryId,
          status: data.status,
          totalVendido: 0,
          cor: data.color,
          tamanho: data.size,
          estoque: data.stock,
        },
      });
    });
    revalidatePath("/");

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
