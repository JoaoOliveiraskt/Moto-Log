import GoBackButton from "@/components/go-back-button";
import Container from "@/components/container";
import { getRecentProducts } from "@/app/actions/product/products";
import ProductList from "@/components/product-list";
import ProductCard from "@/components/product-card";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";

const skeletons = Array.from({ length: 10 }, (_, i) => i);

async function RecentProductsContent() {
  try {
    const products = await getRecentProducts();

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
    console.error(error);
    return [];
  }
}

export default function RecentProducts() {
  const name = "Mais recentes";
  return (
    <Container className="space-y-8 mt-20">
      <div className="flex justify-between items-center">
        <GoBackButton name={name} className="hidden lg:flex" />
      </div>
      <ProductList>
        <Suspense
          fallback={skeletons.map((skeleton) => (
            <ProductCardSkeleton key={skeleton} />
          ))}
        >
          <RecentProductsContent />
        </Suspense>
      </ProductList>
    </Container>
  );
}
