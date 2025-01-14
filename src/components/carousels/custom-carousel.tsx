"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface StyledCarouselProps {
  children: React.ReactNode;
  className?: string;
}

export default function CustomCarousel({
  children,
  className,
}: StyledCarouselProps) {
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
      className={cn(
        "w-full max-w-screen-lg lg:max-w-[1294px] ",
        className
      )}
      opts={{
        containScroll: "trimSnaps",
        slidesToScroll: "auto",
        duration: 20,
        align: "start",
      }}
      setApi={setApi}
    >
      {scrollPrev && (
        <div
          className={cn(
            "absolute z-10 bg-gradient-to-l from-transparent via-background/90 to-background left-0 top-0 h-full w-20 rounded-none",
            "hidden lg:flex"
          )}
        >
          <CarouselPrevious variant="ghost" className="-left-1 h-10 w-10 z-10" />
        </div>
      )}
      {children}
      {scrollNext && (
        <div
          className={cn(
            "absolute bg-gradient-to-r from-transparent via-background/90 to-background right-0 top-0 h-full w-20 rounded-none",
            "hidden lg:flex"
          )}
        >
          <CarouselNext variant="ghost" className="-right-1 h-10 w-10" />
        </div>
      )}
    </Carousel>
  );
}
