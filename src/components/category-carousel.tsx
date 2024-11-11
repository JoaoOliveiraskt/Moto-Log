"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import React, { useEffect, useState } from "react";
import CategoryItem from "./category-item";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export default function CategoryCarousel() {
  const [categories, setCategories] = useState<
    { id: string; nome: string }[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/fetch-categories", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
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
        <div className="flex gap-2 w-full overflow-hidden">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="h-11 min-w-40 rounded-full" />
          ))}
        </div>
      ) : (
        <CarouselContent className="gap-x-3">
          {categories &&
            categories.map((category, index) => (
              <CarouselItem
                key={`${category.id}-${index}`}
                className="basis-auto p-0"
              >
                <CategoryItem
                  category={category}
                  link={`/category/${category.id}`}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
      )}

      <div
        className={cn(
          "absolute bg-gradient-to-l from-transparent via-background/80 to-background left-0 top-0 h-full w-12 rounded-none",
          scrollPrev ? "hidden sm:flex" : "hidden"
        )}
      >
        <CarouselPrevious variant={"ghost"} className="-left-0 h-10 w-10" />
      </div>

      <div
        className={cn(
          "absolute bg-gradient-to-r from-transparent via-background/80 to-background right-0 top-0 h-full w-12 rounded-none",
          scrollNext ? "hidden sm:flex" : "hidden"
        )}
      >
        <CarouselNext variant={"ghost"} className="-right-2 h-10 w-10" />
      </div>
    </Carousel>
  );
}
