"use client";

import { Carousel, CarouselNext, CarouselPrevious } from "../../ui/carousel";
import { ProductsCarouselSkeleton } from "./skeleton/products-carousel-skeleton";
import { Suspense } from "react";
import SectionHeader from "@/components/section-header";

interface Props {
  children: React.ReactNode;
  title: string;
  link: string;
}

export default function ProductsCarousel({ children, title, link }: Props) {
  return (
    <div className="space-y-4 lg:space-y-2">
      <div className="px-4 lg:px-0 lg:pl-2">
        <SectionHeader title={title} href={link} />
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
