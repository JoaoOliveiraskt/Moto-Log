import { db } from "@/lib/prisma";
import ProductList from "./product-list";
import ProductCard from "./product-card";
import type { Produto } from "prisma/generated/client";

interface Props {
  limit: number;
}

export default async function RecentProductsServer({limit = 15}: Props) {
  const products: Produto[] = await db.produto.findMany({
    include: {
      loja: {
        select: { nome: true, id: true, descricao: true, imagemUrl: true },
      },
      categoria: { select: { nome: true, id: true } },
    },
   
  });

  return (
    <ProductList>
      {products.length === 0 ? (
        <h3 className="font-bold text-lg">
          Nenhum produto disponível no momento.
        </h3>
      ) : (
        products
          .reverse()
          .slice(0, limit)
          .map((product: Produto) => (
            <div key={product.id}>
              {/* @ts-ignore */}
              <ProductCard product={product} />
            </div>
          ))
      )}
    </ProductList>
  );
}
