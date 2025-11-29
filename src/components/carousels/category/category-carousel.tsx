"use client";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../ui/carousel";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { CategoryCarouselSkeleton } from "./skeleton/category-carousel-skeleton";
import { motion, useScroll, useMotionValue, useMotionValueEvent } from "framer-motion";
interface CategoryCarouselProps {
  children: React.ReactNode;
}

export default function CategoryCarousel({ children }: CategoryCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [scrollPrev, setScrollPrev] = useState<boolean>(false);
  const [scrollNext, setScrollNext] = useState<boolean>(true);

  const { scrollY } = useScroll();
  const y = useMotionValue(0);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (current: number) => {
    const diff = current - lastScrollY.current;

    // Se diff > 0 (descendo), queremos esconder (y vai para negativo)
    // Se diff < 0 (subindo), queremos mostrar (y vai para 0)
    const newY = y.get() - diff;

    // Clamp entre -100 (escondido) e 0 (visível)
    const clampedY = Math.min(Math.max(newY, -100), 0);

    y.set(clampedY);
    lastScrollY.current = current;
  });

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setScrollPrev(api.canScrollPrev());
      setScrollNext(api.canScrollNext());
    });
  }, [api]);

  return (
    <motion.div
      style={{ y }}
      className={cn(
        "fixed top-9 pb-2 pt-6 lg:top-12 left-0 right-0 z-20  mx-auto flex justify-center bg-background/80 backdrop-blur-md"
      )}
    >
      <Carousel
        className="w-full max-w-screen-lg lg:max-w-[1230px]"
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
              "absolute bg-gradient-to-l from-transparent via-background/90 to-background left-0 top-0 h-full w-20 rounded-none",
              "hidden xl:flex"
            )}
          >
            <CarouselPrevious variant="ghost" className="-left-1 h-10 w-10" />
          </div>
        )}

        {scrollNext && (
          <div
            className={cn(
              "absolute bg-gradient-to-r from-transparent via-background/90 to-background right-0 top-0 h-full w-20 rounded-none",
              "hidden xl:flex"
            )}
          >
            <CarouselNext variant="ghost" className="-right-1 h-10 w-10" />
          </div>
        )}
      </Carousel>
    </motion.div>
  );
}
