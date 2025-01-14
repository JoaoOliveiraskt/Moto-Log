import GoBackButton from "@/components/go-back-button";
import Container from "@/components/container";
import { getBestSellers } from "@/app/actions/product/products";
import ProductList from "@/components/product-list";
import ProductCard from "@/components/product-card";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";

async function BestSellersContent() {
  try {
    const products = await getBestSellers();

    if (!Array.isArray(products) || products.length === 0) {
      return (
        <div className="w-full text-center py-4">
          <p>Nenhum produto encontrado</p>
        </div>
      );
    }

    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  } catch (error) {
    throw new Error("Erro ao buscar produtos");
  }
}

export default function BestSellers() {
  return (
    <Container className="space-y-8 mt-12 lg:mt-14 lg:pt-2">
      <GoBackButton containerClassName="hidden lg:flex" />

      <Suspense
        fallback={
          <ProductList className="lg:gap-x-2">
            {Array.from({ length: 10 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </ProductList>
        }
      >
        <ProductList>
          <BestSellersContent />
        </ProductList>
      </Suspense>
    </Container>
  );
}
