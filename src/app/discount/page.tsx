import ProductList from "@/components/product-list";
import ProductCard from "@/components/product-card";
import { db } from "@/lib/prisma";
import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";

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
      <ProductList>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </ProductList>
    </Container>
  );
}
