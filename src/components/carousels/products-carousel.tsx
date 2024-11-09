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
        const url = process.env.NEXT_PUBLIC_API_URL;
        let endpoint = `${url}/product/all?limit=${limit}`;

        if (productType === "discount") {
          endpoint += "&withDiscount=true";
        } else if (productType === "recent") {
          endpoint += "&sort=recent";
        } else if (productType === "bestselling") {
          endpoint += "&bestSellers=true";
        }

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        throw new Error("Erro ao buscar produtos");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit, productType]);

  return (
    <div className="space-y-4 min-w-full">
      <div className="flex justify-between items-center">
        <TypographyH3>{title}</TypographyH3>
        <SeeAllButton href={link} />
      </div>
      <Carousel
        opts={{
          dragFree: true,
          duration: 17,
          containScroll: "trimSnaps",
          align: "start",
          slidesToScroll: "auto",
        }}
        setApi={setApi}
      >
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
          variant={"ghost"}
          className={cn("h-10 w-10", scrollPrev ? "hidden sm:flex" : "hidden")}
        />
        <CarouselNext
          variant={"ghost"}
          className={cn("h-10 w-10", scrollNext ? "hidden sm:flex" : "hidden")}
        />
      </Carousel>
    </div>
  );
}
