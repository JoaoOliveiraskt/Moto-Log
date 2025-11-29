import Container from "@/components/container";
import { getBestSellers } from "@/app/actions/product/products";
import ProductList from "@/components/product-list";
import ProductCard from "@/components/product-card";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";
import ProductSortDropdown from "@/components/product-sort-dropdown";
import TypographyH4 from "@/components/typography/typography-h4";

interface BestSellersPageProps {
  searchParams: {
    sort?: string;
  };
}

export default async function BestSellers({ searchParams }: BestSellersPageProps) {
  const sort = searchParams.sort;
  const products = await getBestSellers(undefined, sort);

  return (
    <Container className="space-y-4 mt-14 lg:mt-20">
      <div className="flex items-center justify-between mb-6">
        <TypographyH4>Em Alta</TypographyH4>
        <ProductSortDropdown />
      </div>

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
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id}>
                {/* @ts-ignore */}
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-4">
              <p>Nenhum produto encontrado</p>
            </div>
          )}
        </ProductList>
      </Suspense>
    </Container>
  );
}
