import { db } from "@/lib/prisma";
import ProductList from "./product-list";
import ProductCard from "./product-card";
import type { Produto } from "prisma/generated/client";

interface Props {
  limit: number;
}

export default async function DiscountProductsServer({limit = 15}: Props) {
  const discountProducts: Produto[] = await db.produto.findMany({
    where: {
      porcentagemDesconto: {
        gt: 0,
      },
    },
    include: {
      loja: {
        select: {
          nome: true,
          id: true,
          descricao: true,
          imagemUrl: true,
        },
      },
      categoria: {select: {nome: true}},
    },
    
  });

  return (
    <ProductList>
    {discountProducts.length === 0 ? (
      <h3 className="font-bold text-lg">
        Nenhum produto com desconto disponível no momento.
      </h3>
    ) : (
      discountProducts
        .reverse()
        .slice(0, limit)
        .map((product) => (
          <div key={product.id}>
            {/* @ts-ignore */}
            <ProductCard product={product} />
          </div>
        ))
    )}
  </ProductList>
  )
}