"use client";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../ui/carousel";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { CategoryCarouselSkeleton } from "./skeleton/category-carousel-skeleton";
interface CategoryCarouselProps {
  children: React.ReactNode;
}

export default function CategoryCarousel({ children }: CategoryCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [scrollPrev, setScrollPrev] = useState<boolean>(false);
  const [scrollNext, setScrollNext] = useState<boolean>(true);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setScrollPrev(api.canScrollPrev());
      setScrollNext(api.canScrollNext());
    });
  }, [api]);

  return (
    <Carousel
      opts={{
        dragFree: true,
        duration: 14,
        containScroll: "trimSnaps",
        align: "start",
        slidesToScroll: "auto",
      }}
      setApi={setApi}
    >
      <Suspense fallback={<CategoryCarouselSkeleton />}>{children}</Suspense>

      {scrollPrev && (
        <div
          className={cn(
            "absolute bg-gradient-to-l from-transparent via-background/80 to-background left-0 top-0 h-full w-12 rounded-none",
            "hidden sm:flex"
          )}
        >
          <CarouselPrevious variant="ghost" className="-left-0 h-10 w-10" />
        </div>
      )}

      {scrollNext && (
        <div
          className={cn(
            "absolute bg-gradient-to-r from-transparent via-background/80 to-background right-0 top-0 h-full w-12 rounded-none",
            "hidden sm:flex"
          )}
        >
          <CarouselNext variant="ghost" className="-right-2 h-10 w-10" />
        </div>
      )}
    </Carousel>
  );
}
