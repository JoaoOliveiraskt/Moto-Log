import ProductList from "@/components/product-list";
import ProductCard from "@/components/product-card";
import { db } from "@/lib/prisma";
import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import { revalidateTime } from "@/lib/revalidate";

export const revalidate = revalidateTime;

async function getAllDiscountProducts() {
  const products = await db.produto.findMany({
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

  return products;
}

export default async function DiscountPage() {
  const products = await getAllDiscountProducts();
  const title = "Com desconto";

  return (
    <Container className="space-y-8 mt-20">
      <GoBackButton name={title} />
      <ProductList className="min-h-screen">
        {products.length === 0 ? (
          <h3 className="font-bold text-lg">
            Nenhum produto com desconto disponível no momento.
          </h3>
        ) : (
          products
            .slice()
            .reverse()
            .map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
        )}
      </ProductList>
    </Container>
  );
}
