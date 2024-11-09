import GoBackButton from "@/components/go-back-button";
import Container from "@/components/container";
import { getBestSellers } from "@/app/actions/product/products";
import ProductList from "@/components/product-list";
import ProductCard from "@/components/product-card";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";

const skeletons = Array.from({ length: 10 }, (_, i) => i);

async function BestSellersContent() {
  const products = await getBestSellers();

  return products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
}

export default function BestSellers() {
  const name = "Em alta";
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
          <BestSellersContent />
        </Suspense>
      </ProductList>
    </Container>
  );
}
