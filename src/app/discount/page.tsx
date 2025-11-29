import Container from "@/components/container";
import ProductList from "@/components/product-list";
import ProductCard from "@/components/product-card";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";
import { getDiscountProducts } from "@/app/actions/product/products";
import ProductSortDropdown from "@/components/product-sort-dropdown";
import TypographyH4 from "@/components/typography/typography-h4";

interface DiscountPageProps {
  searchParams: {
    sort?: string;
  };
}

export default async function DiscountPage({ searchParams }: DiscountPageProps) {
  const sort = searchParams.sort;
  const DiscountProducts = await getDiscountProducts(undefined, sort);

  return (
    <Container className="space-y-4 mt-14 lg:mt-20">
      <div className="flex items-center justify-between mb-6">
        <TypographyH4>Melhores Ofertas</TypographyH4>
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
}
