"use server";

import { db } from "@/lib/prisma";

export default async function GetCategories() {
  const category = await db.categoria.findMany({
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

  if (!category) {
    return null;
  }

  return category || [];
}
