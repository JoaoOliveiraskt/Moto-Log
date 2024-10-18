"use server";

import { db } from "@/lib/prisma";

export async function getCategoryById(id: string) {
  const category = await db.categoria.findUnique({
    where: { id },
    include: {
      produtos: {
        include: {
          loja: true,
        },
      },
    },
  });

  if (!category) {
    return null;
  }

  return category;
}
