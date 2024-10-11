import ProductList from "@/components/product-list";
import { db } from "@/lib/prisma";
import ProductCard from "@/components/product-card";
import { Produto } from "prisma/generated/client";
import GoBackButton from "@/components/go-back-button";
import Container from "@/components/container";

export default async function RecommendedProducts() {
  const name = "Recomendados";

  const products = await db.produto.findMany({
    include: {
      loja: {
        select: { nome: true },
      }, 
    },
  });

  console.log("Produtos encontrados:", products);
  return (
    <Container className="space-y-8 mt-20 ">
      <div className="flex justify-between items-center">
        <GoBackButton name={name} />
      </div>
      <ProductList>
        {products.slice().reverse().map((product: Produto) => (
          <div key={product.id}>
            {/* @ts-ignore */}
            <ProductCard product={product} />
          </div>
        ))}
      </ProductList>
    </Container>
  );
}
