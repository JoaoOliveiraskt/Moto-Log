import ProductCard from "./product-card";
import { Produto } from "../../prisma/generated/client";
import { db } from "@/lib/prisma";

export default async function ProductList() {
  const products = await db.produto.findMany({
    include: {
      loja: {
        select: { nome: true },
      },
    },
    take: 20,
  });
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {products.map((product: Produto) => (
        <div key={product.id}>
          {/* @ts-ignore */}
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
