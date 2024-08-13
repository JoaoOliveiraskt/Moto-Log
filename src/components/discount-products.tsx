import Container from "./container";
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

  if (!discountProducts) {
    return [];
  }

  return discountProducts;
}

export default async function DiscountProducts() {
  const products = await getDiscountProducts();

  if (!products) {
    return null;
  }

  return (
    <div className="my-10 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-xl sm:text-3xl">
          Produtos em desconto
        </h2>

        <SeeAllButton href="#" />
      </div>
      <ProductList>
        {products.slice(0, 10).map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </ProductList>
    </div>
  );
}
