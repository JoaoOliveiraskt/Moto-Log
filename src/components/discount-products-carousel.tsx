"use client";

import ProductCard from "./product-card";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import ProductCardSkeleton from "./product-card-skeleton";

interface Props {
  limit?: number;
}

interface Product {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
}

export default function DiscountProductsCarousel({ limit }: Props) {
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscountProducts = async () => {
      try {
        // tempo pra esperar o fetch para teste
        // await new Promise((resolve) => setTimeout(resolve, 600000));
        const url = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(
          `${url}/product/all?withDiscount=true&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setDiscountProducts(data);
      } catch (error) {
        throw new Error("Erro ao buscar produtos em desconto");
      } finally {
        setLoading(false);
      }
    };
    fetchDiscountProducts();
  }, [limit]);

  return (
    <>
      <Carousel opts={{ dragFree: true, slidesToScroll: 2 }}>
        {loading ? (
          <CarouselContent className="flex gap-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </CarouselContent>
        ) : (
          <CarouselContent className="flex gap-2">
            {discountProducts.map((product) => (
              <div key={product.id}>
                {/* @ts-ignore */}
                <ProductCard product={product} className="min-w-64" />
              </div>
            ))}
          </CarouselContent>
        )}
        <CarouselPrevious className="hidden lg:flex left-36 -top-[2rem]" />
        <CarouselNext className="hidden lg:flex left-48 -top-[2rem]" />
      </Carousel>
    </>
  );
}
