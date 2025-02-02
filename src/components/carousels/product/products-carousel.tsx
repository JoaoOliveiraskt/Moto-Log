"use client";

import { Carousel, CarouselNext, CarouselPrevious } from "../../ui/carousel";
import { ProductsCarouselSkeleton } from "./skeleton/products-carousel-skeleton";
import { Suspense } from "react";
import SeeAllButton from "@/components/see-all-button";
import TypographyH4 from "@/components/typography/typography-h4";

interface Props {
  children: React.ReactNode;
  title: string;
  link: string;
}

export default function ProductsCarousel({ children, title, link }: Props) {
  return (
    <div className="space-y-6 bg-transparent">
      <div className="flex justify-between items-center px-4 2xl:px-0">
        <TypographyH4>{title}</TypographyH4>

        <SeeAllButton href={link} />
      </div>

      <Carousel
        opts={{
          containScroll: "trimSnaps",
          slidesToScroll: "auto",
          duration: 20,
          align: "start",
        }}
      >
        <Suspense fallback={<ProductsCarouselSkeleton />}>{children}</Suspense>

        <CarouselPrevious className="hidden xl:inline-flex left-0 2xl:-left-4 top-1/3" />
        <CarouselNext className="hidden xl:inline-flex right-0 2xl:-right-6 top-1/3" />
      </Carousel>
    </div>
  );
}
