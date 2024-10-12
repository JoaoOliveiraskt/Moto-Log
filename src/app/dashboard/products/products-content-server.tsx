import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import ProductsContentClient from "./products-content";

async function getProductsForUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return [];
  }

  const userId = session.user.id;

  const products = await db.produto.findMany({
    where: { loja: { userId: userId } },
    include: { loja: { select: { nome: true, id: true } } },
  });

  return products || [];
}

export default async function ProductsContentServer() {
  const products = await getProductsForUser();

  return <ProductsContentClient />;
}