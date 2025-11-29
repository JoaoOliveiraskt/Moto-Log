import React, { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

interface SearchResultsPageProps {
    searchParams: {
        q?: string;
        type?: string;
    };
}

const searchParamsSchema = z.object({
    q: z.string().optional().default(""),
    type: z.enum(["stores", "products", "categories"]).optional(),
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

async function SearchResultsContent({ q, type }: { q: string; type?: string }) {
    const { products, stores, categories } = await searchGlobal(q);

    const hasResults = products.length > 0 || stores.length > 0 || categories.length > 0;

    if (!hasResults) {
        return <SearchEmptyState />;
    }

    const showTitles = !type; // Show titles only in "Tudo" view

    return (
        <div className="space-y-8">
            {/* Lojas */}
            {(!type || type === "stores") && (
                <section className="space-y-4">
                    {showTitles && stores.length > 0 && <TypographyH4>Lojas</TypographyH4>}
                    {stores.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {stores.map((store) => (
                                <Link
                                    key={store.id}
                                    href={`/store/${store.id}`}
                                    className="flex items-center gap-4 p-4 rounded-2xl dark:border bg-card hover:bg-accent transition-colors"
                                >
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-accent border shrink-0">
                                        {store.profileImageUrl ? (
                                            <Image
                                                src={store.profileImageUrl}
                                                alt={store.nome}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-muted flex items-center justify-center">
                                                <Icon.store size={24} className="text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                                        <TypographyP className="truncate">
                                            {store.nome}
                                        </TypographyP>
                                        {store._count && (
                                            <TypographySmall className="flex items-center gap-1">
                                                <Icon.users size={14} />
                                                {store._count.followers} {store._count.followers > 1 ? "seguidores" : "seguidor"}
                                            </TypographySmall>
                                        )}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                                        <Icon.chevronRight size={16} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : type === "stores" ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <Icon.store className="text-muted-foreground" size={24} />
                            </div>
                            <TypographyP className="text-muted-foreground">
                                Nenhuma loja encontrada para "{q}".
                            </TypographyP>
                        </div>
                    ) : null}
                </section>
            )}


            {/* Categorias */}
            {(!type || type === "categories") && (
                <section className="space-y-4">
                    {showTitles && categories.length > 0 && <TypographyH4>Categorias</TypographyH4>}
                    {categories.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
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
            {(!type || type === "products") && (
                <section className="space-y-4">
                    {showTitles && products.length > 0 && <TypographyH4>Produtos</TypographyH4>}
                    {products.length > 0 ? (
                        <ProductList>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </ProductList>
                    ) : type === "products" ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <Icon.products className="text-muted-foreground" size={24} />
                            </div>
                            <TypographyP className="text-muted-foreground">
                                Nenhum produto encontrado para "{q}".
                            </TypographyP>
                        </div>
                    ) : null}
                </section>
            )}
        </div>
    );
}

export default async function SearchResultsPage({ searchParams }: SearchResultsPageProps) {
    const { q, type } = searchParamsSchema.parse(searchParams);

    if (!q) {
        return (
            <Container className="pt-20 pb-20">
                <SearchEmptyState />
            </Container>
        );
    }

    return (
        <div className="pt-12 lg:pt-16">
            <SearchResultsTabs currentType={type} q={q} />
            <Container>
                <Suspense fallback={<SearchResultsSkeleton type={type} />}>
                    <SearchResultsContent q={q} type={type} />
                </Suspense>
            </Container>
        </div>
    );
}
