import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import ProductList from "@/components/product-list";
import ProductCard from "@/components/product-card";
import type { Produto } from "prisma/generated/client";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";

export default async function DiscountPage() {
  const title = "Melhores ofertas";
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    return <div>Erro ao carregar produtos</div>;
  }

  try {
    const response = await fetch(`${url}/product/all?withDiscount=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const DiscountProducts: Produto[] = await response.json();

    if (!Array.isArray(DiscountProducts)) {
      throw new Error("Dados recebidos não estão no formato esperado");
    }

    return (
      <Container className="space-y-8 mt-16">
        <GoBackButton name={title} containerClassName="hidden lg:flex"/>
        <Suspense
          fallback={
            <ProductList>
              {Array.from({ length: 10 }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </ProductList>
          }
        >
          <ProductList>
            {DiscountProducts.length > 0 ? (
              DiscountProducts.map((product) => (
                <div key={product.id}>
                  {/* @ts-ignore */}
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div>Nenhum produto em desconto encontrado</div>
            )}
          </ProductList>
        </Suspense>
      </Container>
    );
  } catch (error) {
    return (
      <Container className="space-y-8 mt-20">
        <GoBackButton name={title} className="hidden lg:flex" />
        <div>
          Erro ao carregar produtos em desconto. Por favor, tente novamente mais
          tarde.
        </div>
      </Container>
    );
  }
}
