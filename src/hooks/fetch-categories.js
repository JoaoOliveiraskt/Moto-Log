import { db } from "../lib/prisma";

export default async function FetchCategory() {
  const categories = await db.categoria.findMany({});
  return categories;
}
