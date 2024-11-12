"use client";

import ProductCard from "../product-card";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import ProductCardSkeleton from "../product-card-skeleton";
import { Produto, Categoria, Loja } from "prisma/generated/client";
import TypographyH3 from "../typography/typography-h3";
import SeeAllButton from "../see-all-button";
import { cn } from "@/lib/utils";
import {
  getDiscountProducts,
  getRecentProducts,
  getBestSellers,
} from "@/app/actions/product/products";

interface Props {
  limit?: number;
  productType: "discount" | "recent" | "bestselling";
  title: string;
  link: string;
}

interface ProductCardProps extends Produto {
  categoria: Categoria;
  loja: Loja;
}

export default function ProductsCarousel({
  limit,
  productType,
  title,
  link,
}: Props) {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [scrollPrev, setScrollPrev] = useState<boolean>(false);
  const [scrollNext, setScrollNext] = useState<boolean>(true);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setScrollPrev(api.canScrollPrev());
      setScrollNext(api.canScrollNext());
    });
  }, [api]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let productsData = [];

        switch (productType) {
          case "discount":
            productsData = await getDiscountProducts(limit);
            break;
          case "recent":
            productsData = await getRecentProducts(limit);
            break;
          case "bestselling":
            productsData = await getBestSellers(limit);
            break;
        }

        if (!Array.isArray(productsData) || productsData.length === 0) {
          return [];
        }

        setProducts(productsData);
      } catch (error) {
        throw new Error("Erro ao buscar produtos");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit, productType]);

  return (
    <div className="">
      <Carousel
        opts={{
          containScroll: "trimSnaps",
          duration: 14,
          align: "start",
        }}
        className="space-y-4"
        setApi={setApi}
      >
        <div className="flex justify-between items-center">
          <TypographyH3>{title}</TypographyH3>
          <div className="flex items-center gap-x-2">
            <SeeAllButton href={link} />
          </div>
        </div>
        {loading ? (
          <CarouselContent className="flex gap-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </CarouselContent>
        ) : (
          <CarouselContent className="flex gap-2">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  className="min-w-64"
                  side="top"
                />
              </div>
            ))}
          </CarouselContent>
        )}

        <CarouselPrevious
          className={cn("left-2", scrollPrev ? "" : "hidden")}
        />

        <CarouselNext className={cn("right-2", scrollNext ? "" : "hidden")} />
      </Carousel>
    </div>
  );
}
