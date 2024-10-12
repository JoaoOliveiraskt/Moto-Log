import ProductList from "./product-list";
import SeeAllButton from "./see-all-button";
import { db } from "@/lib/prisma";
import ProductCard from "./product-card";
import { Produto } from "prisma/generated/client";

async function getRecommendedProducts() {
  const products = await db.produto.findMany({
    include: {
      loja: {
        select: { nome: true, id: true, descricao: true, imagemUrl: true },
      },
    },
  });

  return products || [];
}

export default async function RecommendedProducts() {
  const products = await getRecommendedProducts();

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-xl sm:text-3xl">
          Recomendados
        </h2>
        <SeeAllButton href="/recommended" />
      </div>
      <ProductList>
        {products.length === 0 ? (
          <h3 className="font-bold text-lg">
            Nenhum produto disponível no momento.
          </h3>
        ) : (
          products
            .reverse()
            .slice(0, 15)
            .map((product: Produto) => (
              <div key={product.id}>
                {/* @ts-ignore */}
                <ProductCard product={product} />
              </div>
            ))
        )}
      </ProductList>
    </div>
  );
}
