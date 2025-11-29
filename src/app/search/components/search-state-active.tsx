import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/icons/icon-component";
import formatCurrency from "@/app/helpers/format-currency";
import TypographyMuted from "@/components/typography/typography-muted";
import TypographySmall from "@/components/typography/typography-small";
import TypographyP from "@/components/typography/typography-p";
import CategoryItem from "@/components/category-item";
import StoreCardListItem from "@/components/store-card-list-item";

interface SearchResult {
    stores: any[];
    products: any[];
    categories: any[];
}

interface SearchStateActiveProps {
    results: SearchResult;
    onSelect?: () => void;
}

export default function SearchStateActive({ results, onSelect }: SearchStateActiveProps) {
    const hasResults =
        results.stores.length > 0 ||
        results.products.length > 0 ||
        results.categories.length > 0;

    if (!hasResults) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Icon.search size={48} className="mb-4 opacity-20" />
                <TypographyMuted>Nenhum resultado encontrado.</TypographyMuted>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8">
            {/* Lojas Encontradas */}
            {results.stores.length > 0 && (
                <section className="space-y-3">
                    <TypographyMuted className="px-1 font-medium">
                        Lojas
                    </TypographyMuted>
                    <div className="grid grid-cols-1 gap-2">
                        {results.stores.map((store) => (
                            <StoreCardListItem
                                key={store.id}
                                store={store}
                                onClick={onSelect}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Categorias Encontradas */}
            {results.categories.length > 0 && (
                <section className="space-y-3">
                    <TypographyMuted className="px-1 font-medium">
                        Categorias
                    </TypographyMuted>
                    <div className="flex flex-wrap gap-2">
                        {results.categories.map((category) => (
                            <CategoryItem
                                key={category.id}
                                category={category}
                                link={`/category/${category.id}`}
                                onClick={onSelect}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Produtos Encontrados */}
            {results.products.length > 0 && (
                <section className="space-y-3">
                    <TypographyMuted className="px-1 font-medium">
                        Produtos
                    </TypographyMuted>
                    <div className="space-y-2">
                        {results.products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                onClick={onSelect}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors group"
                            >
                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted border shrink-0">
                                    <Image
                                        src={product.imagemUrl}
                                        alt={product.nome}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <TypographyP className="font-medium truncate">{product.nome}</TypographyP>
                                    <div className="flex items-center gap-2">
                                        <TypographySmall className="font-bold text-primary">
                                            {formatCurrency(Number(product.preco ?? 0))}
                                        </TypographySmall>
                                        {product.categoria && (
                                            <TypographyMuted className="text-xs truncate">
                                                • {product.categoria.nome}
                                            </TypographyMuted>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
