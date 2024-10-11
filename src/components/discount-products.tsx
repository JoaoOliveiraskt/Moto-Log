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
      <div className="flex justify-between items-center ">
        <h2 className="font-bold text-primary text-xl sm:text-3xl">
          Com desconto
        </h2>
        <SeeAllButton href="/discount" />
      </div>
      <ProductList>
        {products
          .reverse()
          .slice(0, 15)
          .map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
      </ProductList>
    </div>
  );
}
