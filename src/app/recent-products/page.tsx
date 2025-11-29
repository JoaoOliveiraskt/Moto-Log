import Container from "@/components/container";
import { getRecentProducts } from "@/app/actions/product/products";
import ProductList from "@/components/product-list";
import ProductCard from "@/components/product-card";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";
import ProductSortDropdown from "@/components/product-sort-dropdown";
import TypographyH2 from "@/components/typography/typography-h2";

interface RecentProductsPageProps {
  searchParams: {
    sort?: string;
  };
}

export default async function RecentProducts({ searchParams }: RecentProductsPageProps) {
  const sort = searchParams.sort;
  const products = await getRecentProducts(undefined, sort);

  return (
    <Container className="space-y-8 mt-14 lg:mt-20">
      <div className="flex items-center justify-between mb-6">
        <TypographyH2 className="hidden lg:flex font-medium">Mais Recentes</TypographyH2>
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
