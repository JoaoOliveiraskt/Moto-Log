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

const Animation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 50, duration: 0.7, delay: 0.2 },
};

export default async function DiscountProducts() {
  const products = await getDiscountProducts();

  return (
    <div  className="space-y-5">
      <div className="flex justify-between items-center ">
        <h2 className="font-bold text-primary text-xl sm:text-3xl">
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
