import { Categoria } from "../../prisma/generated/client";
import { db } from "../lib/prisma";

export default async function FetchCategory(): Promise<Categoria[]> {
  const categories = await db.categoria.findMany({});
  return categories;
}
