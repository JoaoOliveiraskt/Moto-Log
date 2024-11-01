import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import ProductList from "@/components/product-list";
import ProductCard from "@/components/product-card";
import type { Produto } from "prisma/generated/client";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";

export default async function DiscountPage() {
  const title = "Top ofertas";
  const url = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(
    `${url}/product/all?withDiscount=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const DiscountProducts: Produto[] = await response.json();
  console.log(DiscountProducts);

  return (
    <Container className="space-y-8 mt-20">
      <GoBackButton name={title} className="hidden lg:flex" />
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
          {DiscountProducts.map((product) => (
            <div key={product.id}>
              {/* @ts-ignore */}
              <ProductCard product={product} />
            </div>
          ))}
        </ProductList>
      </Suspense>
    </Container>
  );
}
