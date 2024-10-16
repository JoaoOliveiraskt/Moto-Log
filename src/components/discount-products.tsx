import { db } from "@/lib/prisma";
import ProductCard from "./product-card";
import SeeAllButton from "./see-all-button";
import ProductList from "./product-list";

async function getDiscountProducts() {
  const discountProducts = await db.produto.findMany({
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
    },
  });

  return discountProducts || [];
}

export default async function DiscountProducts() {
  const products = await getDiscountProducts();

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center lg:justify-normal">
        <h2 className="font-bold text-primary text-xl sm:text-4xl">
          Com desconto
        </h2>
        <SeeAllButton href="/discount" />
      </div>
      <ProductList>
        {products.length === 0 ? (
          <h3 className="font-bold text-lg">
            Nenhum produto com desconto disponível no momento.
          </h3>
        ) : (
          products
            .reverse()
            .slice(0, 15)
            .map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
        )}
      </ProductList>
    </div>
  );
}
