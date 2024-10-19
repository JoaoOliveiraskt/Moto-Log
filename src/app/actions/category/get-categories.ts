"use server";

import { db } from "@/lib/prisma";

export default async function GetCategories() {
  const category = await db.categoria.findMany();

  if (!category) {
    return null;
  }

  return category;
}
