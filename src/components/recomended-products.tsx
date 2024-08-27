import ProductList from "./product-list";
import SeeAllButton from "./see-all-button";
import { db } from "@/lib/prisma";
import ProductCard from "./product-card";
import { Produto } from "prisma/generated/client";

export default async function RecomendedProducts() {
  const products = await db.produto.findMany({
    include: {
      loja: {
        select: { nome: true },
      },
    },
    take: 15,
  });
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-xl sm:text-3xl">
          Recomendados
        </h2>
        <SeeAllButton href="#" />
      </div>
      <ProductList>
      {products.map((product: Produto) => (
        <div key={product.id}>
          {/* @ts-ignore */}
          <ProductCard product={product} />
        </div>
      ))}
      </ProductList>
    </div>
  );
}
