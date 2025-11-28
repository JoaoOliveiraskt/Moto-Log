import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/icons/icon-component";
import { Store, Category } from "@/hooks/use-search-initial-data";
import { Product } from "@/app/types/product";
import formatCurrency from "@/app/helpers/format-currency";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import TypographyMuted from "@/components/typography/typography-muted";
import TypographySmall from "@/components/typography/typography-small";
import TypographyP from "@/components/typography/typography-p";
import CategoryItem from "@/components/category-item";

interface SearchStateDefaultProps {
    stores: Store[];
    categories: Category[];
    products: Product[];
    onSelect?: () => void;
}

export default function SearchStateDefault({
    stores,
    categories,
    products,
    onSelect,
}: SearchStateDefaultProps) {
    return (
        <div className="space-y-8 pb-8">
            {/* Lojas em Alta */}
            {stores.length > 0 && (
                <section className="space-y-3">
                    <Link href="/community" onClick={onSelect} className="flex items-center text-muted-foreground font-medium">
                        <TypographyMuted>
                            Lojas em Alta
                        </TypographyMuted>
                        <Icon.chevronRight size={16} />
                    </Link>
                    <Carousel
                        opts={{
                            dragFree: true,
                            duration: 14,
                            containScroll: "trimSnaps",
                            align: "start",
                            slidesToScroll: "auto",
                        }}
                        className="w-full relative"
                    >
                        <CarouselContent>
                            {stores.map((store) => (
                                <CarouselItem key={store.id} className="basis-auto p-0">
                                    <Link
                                        href={`/store/${store.id}`}
                                        onClick={onSelect}
                                        className="flex flex-col items-center gap-2 w-[80px]"
                                    >
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border bg-muted group">
                                            {store.profileImageUrl ? (
                                                <Image
                                                    src={store.profileImageUrl}
                                                    alt={store.nome}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-accent group-hover:bg-accent/80 transition-colors">
                                                    <Icon.store className="text-muted-foreground" size={24} />
                                                </div>
                                            )}
                                        </div>
                                        <TypographySmall className="text-center truncate w-full">
                                            {store.nome}
                                        </TypographySmall>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious
                            className="left-0 h-8 w-8 -translate-x-1/4"
                            containerClassName="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
                        />
                        <CarouselNext
                            className="right-0 h-8 w-8 translate-x-1/4"
                            containerClassName="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
                        />
                    </Carousel>
                </section>
            )}

            {/* Categorias */}
            {categories.length > 0 && (
                <section className="space-y-3">
                    <TypographyMuted className="px-1 font-medium">
                        Categorias
                    </TypographyMuted>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
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

            {/* Produtos em Destaque */}
            {products.length > 0 && (
                <section className="space-y-3">
                    <TypographyMuted className="px-1 font-medium">
                        Produtos em Destaque
                    </TypographyMuted>
                    <div className="space-y-2">
                        {products.map((product) => (
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
                                            {formatCurrency(Number(product.preco))}
                                        </TypographySmall>
                                        {product.loja && (
                                            <TypographyMuted className="text-xs truncate">
                                                • {product.loja.nome}
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
