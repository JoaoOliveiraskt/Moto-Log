import React, { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { z } from "zod";
import Container from "@/components/container";
import TypographyP from "@/components/typography/typography-p";
import ProductCard from "@/components/product-card";
import CategoryItem from "@/components/category-item";
import Icon from "@/components/icons/icon-component";
import { searchGlobal } from "@/lib/search";
import SearchEmptyState from "@/components/empty-states/search-empty-state";
import TypographySmall from "@/components/typography/typography-small";
import TypographyH4 from "@/components/typography/typography-h4";
import SearchResultsTabs from "./components/search-results-tabs";
import SearchResultsSkeleton from "./components/search-results-skeleton";
import ProductList from "@/components/product-list";
import StoreCardListItem from "@/components/store-card-list-item";
import ProductSortDropdown from "@/components/product-sort-dropdown";
import InfiniteProductsList from "./components/infinite-products-list";

interface SearchResultsPageProps {
    searchParams: {
        q?: string;
        type?: string;
        sort?: string;
    };
}

const searchParamsSchema = z.object({
    q: z.string().optional().default(""),
    type: z.enum(["stores", "products", "categories"]).optional(),
    sort: z.enum(["relevance", "price_asc", "price_desc", "name_asc"]).optional().default("relevance"),
});

export async function generateMetadata({ searchParams }: SearchResultsPageProps): Promise<Metadata> {
    const { q } = searchParamsSchema.parse(searchParams);
    const title = q ? `Resultados para "${q}" | Moto Log` : "Busca | Moto Log";

    return {
        title,
        description: `Resultados da busca por ${q} na Moto Log.`,
        robots: {
            index: !!q,
            follow: !!q,
        },
    };
}

async function SearchResultsContent({ q, type, sort }: { q: string; type?: string; sort: string }) {
    const { products, stores, categories } = await searchGlobal(q);

    const hasResults = products.length > 0 || stores.length > 0 || categories.length > 0;

    if (!hasResults) {
        return <SearchEmptyState />;
    }

    // Server-side sorting
    if (sort === "price_asc") {
        products.sort((a, b) => Number(a.preco) - Number(b.preco));
    } else if (sort === "price_desc") {
        products.sort((a, b) => Number(b.preco) - Number(a.preco));
    } else if (sort === "name_asc") {
        products.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    const showTitles = !type; // Show titles only in "Tudo" view

    // Limit results in "Tudo" tab
    const LIMIT_IN_ALL_TAB = 6;
    const displayedStores = !type ? stores.slice(0, LIMIT_IN_ALL_TAB) : stores;
    const displayedProducts = !type ? products.slice(0, LIMIT_IN_ALL_TAB) : products;
    const displayedCategories = !type ? categories.slice(0, LIMIT_IN_ALL_TAB) : categories;

    const shouldShowStores = type === "stores" || (!type && stores.length > 0);
    const shouldShowCategories = type === "categories" || (!type && categories.length > 0);
    const shouldShowProducts = type === "products" || (!type && products.length > 0);

    return (
        <div className="space-y-8">
            {/* Lojas */}
            {shouldShowStores && (
                <section className="space-y-4">
                    {showTitles && stores.length > 0 && (
                        !type && stores.length > LIMIT_IN_ALL_TAB ? (
                            <Link
                                href={`/search/results?q=${q}&type=stores`}
                                className="flex items-center gap-2 group"
                            >
                                <TypographyH4>Lojas</TypographyH4>
                                <Icon.chevronRight size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                            </Link>
                        ) : (
                            <TypographyH4>Lojas</TypographyH4>
                        )
                    )}
                    {displayedStores.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {displayedStores.map((store) => (
                                <StoreCardListItem key={store.id} store={store} />
                            ))}
                        </div>
                    ) : type === "stores" ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <Icon.store className="text-muted-foreground" size={24} />
                            </div>
                            <TypographyP className="text-muted-foreground">
                                Nenhuma loja encontrada para &quot;{q}&quot;.
                            </TypographyP>
                        </div>
                    ) : null}
                </section>
            )}

            {/* Categorias */}
            {shouldShowCategories && (
                <section className="space-y-4">
                    {showTitles && categories.length > 0 && (
                        !type && categories.length > LIMIT_IN_ALL_TAB ? (
                            <Link
                                href={`/search/results?q=${q}&type=categories`}
                                className="flex items-center gap-2 group"
                            >
                                <TypographyH4>Categorias</TypographyH4>
                                <Icon.chevronRight size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                            </Link>
                        ) : (
                            <TypographyH4>Categorias</TypographyH4>
                        )
                    )}
                    {displayedCategories.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {displayedCategories.map((category) => (
                                <CategoryItem
                                    key={category.id}
                                    category={category}
                                    link={`/category/${category.id}`}
                                />
                            ))}
                        </div>
                    ) : type === "categories" ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <Icon.categories className="text-muted-foreground" size={24} />
                            </div>
                            <TypographyP className="text-muted-foreground">
                                Nenhuma categoria encontrada para "{q}".
                            </TypographyP>
                        </div>
                    ) : null}
                </section>
            )}

            {/* Produtos */}
            {shouldShowProducts && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        {showTitles && products.length > 0 && (
                            !type && products.length > LIMIT_IN_ALL_TAB ? (
                                <Link
                                    href={`/search/results?q=${q}&type=products`}
                                    className="flex items-center gap-2 group"
                                >
                                    <TypographyH4>Produtos</TypographyH4>
                                    <Icon.chevronRight size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                                </Link>
                            ) : (
                                <TypographyH4>Produtos</TypographyH4>
                            )
                        )}
                        {products.length > 0 && type === "products" && <ProductSortDropdown />}
                    </div>
                    {type === "products" ? (
                        <InfiniteProductsList
                            query={q}
                            sort={sort}
                        />
                    ) : displayedProducts.length > 0 ? (
                        <ProductList>
                            {displayedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </ProductList>
                    ) : null}
                </section>
            )}
        </div>
    );
}

export default async function SearchResultsPage({ searchParams }: SearchResultsPageProps) {
    const { q, type, sort } = searchParamsSchema.parse(searchParams);

    if (!q) {
        return (
            <Container className="pt-20 pb-20">
                <SearchEmptyState />
            </Container>
        );
    }

    return (
        <Container className="!px-0">
            <SearchResultsTabs currentType={type} q={q} />
            <div className="pt-16 lg:pt-20 px-4">
                <Suspense fallback={<SearchResultsSkeleton type={type} />}>
                    <SearchResultsContent q={q} type={type} sort={sort} />
                </Suspense>
            </div>
        </Container>
    );
}
