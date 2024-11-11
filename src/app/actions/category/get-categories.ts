import { db } from "@/lib/prisma";

interface Props {
  categoryNames: string[];
  maxDiscount?: number;
}

export default async function GetCategories({
  categoryNames,
  maxDiscount = 20,
}: Props) {
  const categories = await db.categoria.findMany({
    where: {
      nome: {
        in: categoryNames,
      },
    },
    include: {
      produtos: {
        where: {
          porcentagemDesconto: {
            lte: maxDiscount,
          },
        },
        select: {
          id: true,
          nome: true,
          preco: true,
          porcentagemDesconto: true,
          imagemUrl: true,
          loja: true,
          lojaId: true,
        },
      },
    },
    orderBy: { nome: "asc" },
  });

  return categories;
}
