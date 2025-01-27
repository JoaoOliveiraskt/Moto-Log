import { db } from "@/lib/prisma";

interface Props {
  categoryNames: string[];
  maxDiscount?: number;
}

export default async function GetCategories({ categoryNames }: Props) {
  const categories = await db.categoria.findMany({
    where: {
      nome: {
        in: categoryNames,
      },
    },
    orderBy: { nome: "asc" },
  });

  return categories;
}
