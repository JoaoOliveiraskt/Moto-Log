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
    take: 6,
  });
  console.log(products);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {products.map((product: Produto) => (
        <div key={product.id}>
          {/* @ts-ignore */}
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
