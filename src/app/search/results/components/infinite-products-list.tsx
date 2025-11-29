"use client";

import { useInfiniteProducts } from "@/hooks/use-infinite-products";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import InfiniteScrollTrigger from "./infinite-scroll-trigger";
import { Skeleton } from "@/components/ui/skeleton";
import Icon from "@/components/icons/icon-component";
import TypographyP from "@/components/typography/typography-p";
import { useMemo } from "react";

interface InfiniteProductsListProps {
    query: string;
    sort: string;
}

export default function InfiniteProductsList({
    query,
    sort,
}: InfiniteProductsListProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteProducts(query, sort);

    // Combine all pages and apply client-side sorting
    const allProducts = useMemo(() => {
        if (!data?.pages) {
            return [];
        }

        // Flatten all products from all pages
        const products = data.pages
            .flatMap((page) => {
                return page?.products || [];
            })
            .filter((product) => product && product.id);

        // Client-side sorting (secure - no SQL injection risk)
        if (sort === "price_asc") {
            return products.sort((a, b) => Number(a.preco) - Number(b.preco));
        } else if (sort === "price_desc") {
            return products.sort((a, b) => Number(b.preco) - Number(a.preco));
        } else if (sort === "name_asc") {
            return products.sort((a, b) => a.nome.localeCompare(b.nome));
        }

        return products; // Default: no additional sorting (already ordered by ID DESC from API)
    }, [data?.pages, sort]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="aspect-square rounded-2xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Icon.products className="text-muted-foreground" size={24} />
                </div>
                <TypographyP className="text-muted-foreground">
                    Erro ao carregar produtos. Tente novamente.
                </TypographyP>
            </div>
        );
    }

    if (allProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Icon.products className="text-muted-foreground" size={24} />
                </div>
                <TypographyP className="text-muted-foreground">
                    Nenhum produto encontrado para "{query}".
                </TypographyP>
            </div>
        );
    }

    return (
        <>
            <ProductList>
                {allProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ProductList>

            <InfiniteScrollTrigger
                onIntersect={() => fetchNextPage()}
                hasMore={!!hasNextPage}
                isLoading={isFetchingNextPage}
            />
        </>
    );
}
