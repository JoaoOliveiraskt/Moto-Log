import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { ProdutoStatus } from "prisma/generated/client";
import { z } from "zod";

const updateProductSchema = z.object({
  nome: z.string().min(2, "O nome é obrigatório").max(100).optional(),
  descricao: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .optional(),
  imagemUrl: z.string().url("A URL da imagem deve ser válida").optional(),
  preco: z.number().min(0.01, "O preço deve ser maior que zero").optional(),
  porcentagemDesconto: z.number().optional(),
  estoque: z
    .number()
    .int()
    .min(0, "O estoque deve ser maior ou igual a zero")
    .optional(),
  categoriaId: z.string().optional(),
  status: z.enum([ProdutoStatus.ATIVO, ProdutoStatus.ARQUIVADO]).optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: { "product-id": string } }
) {
  try {
    const body = await request.json();

    const validateData = updateProductSchema.parse(body);

    const response = await db.produto.update({
      where: { id: params["product-id"] },
      data: validateData,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar produto: ", error);
    return NextResponse.json(
      { message: "Erro ao atualizar produto ", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { "product-id": string } }
) {
  try {
    const response = await db.produto.delete({
      where: { id: params["product-id"] },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar produto: ", error);
    return NextResponse.json(
      { message: "Erro ao deletar produto ", error },
      { status: 500 }
    );
  }
}
