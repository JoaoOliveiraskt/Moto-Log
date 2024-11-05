"use client";

import GetCategories from "@/app/actions/category/get-categories";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import React, { useEffect, useState } from "react";
import CategoryItem from "./category-item";
import { Skeleton } from "./ui/skeleton";

interface Props {
  opts?: {
    dragFree?: boolean;
    slidesToScroll?: number;
  };
}

export default function CategoryCarousel({
  opts = { dragFree: true, slidesToScroll: 2 },
}: Props) {
  const [categories, setCategories] = useState<
    { id: string; nome: string }[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await GetCategories();
        setCategories(data);
      } catch (error) {
        setError("Erro ao carregar categorias.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Carousel opts={opts}>
      {loading ? (
        <div className="flex gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-9 min-w-40 rounded-lg" />
          ))}
        </div>
      ) : (
        <CarouselContent className="flex gap-2 ">
          {categories &&
            categories.map((category, index) => (
              <CategoryItem
                key={`${category.id}-${index}`}
                category={category}
                link={`/category/${category.id}`}
              />
            ))}
        </CarouselContent>
      )}
    </Carousel>
  );
}
