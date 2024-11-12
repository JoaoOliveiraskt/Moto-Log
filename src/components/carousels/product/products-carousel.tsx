"use client";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../ui/carousel";
import { ProductsCarouselSkeleton } from "./skeleton/products-carousel-skeleton";
import { Suspense, useEffect, useState } from "react";
import TypographyH3 from "@/components/typography/typography-h3";
import SeeAllButton from "@/components/see-all-button";

interface Props {
  children: React.ReactNode;
  title: string;
  link: string;
}

export default function ProductsCarousel({ children, title, link }: Props) {
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH3>{title}</TypographyH3>
        <div className="flex items-center gap-x-2">
          <SeeAllButton href={link} />
        </div>
      </div>

      <Carousel
        opts={{
          containScroll: "trimSnaps",
          duration: 14,
          align: "start",
        }}
        className="space-y-4"
        setApi={setApi}
      >
        <Suspense fallback={<ProductsCarouselSkeleton />}>{children}</Suspense>

        {scrollPrev && <CarouselPrevious className="left-2" />}
        {scrollNext && <CarouselNext className="right-2" />}
      </Carousel>
    </div>
  );
}
