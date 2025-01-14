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
import { motion } from "framer-motion";
interface CategoryCarouselProps {
  children: React.ReactNode;
}

export default function CategoryCarousel({ children }: CategoryCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [scrollPrev, setScrollPrev] = useState<boolean>(false);
  const [scrollNext, setScrollNext] = useState<boolean>(true);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingUp(false);
      } else {
        setScrollingUp(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setScrollPrev(api.canScrollPrev());
      setScrollNext(api.canScrollNext());
    });
  }, [api]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: scrollingUp ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className="fixed w-screen top-12 pt-1 pb-2 lg:top-14 lg:pr-4 left-0 right-0 z-20 bg-background mx-auto  flex justify-center"
    >
      <Carousel
        className="w-full mx-auto max-w-screen-lg lg:max-w-[1294px] "
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
              "hidden lg:flex"
            )}
          >
            <CarouselPrevious variant="ghost" className="-left-1 h-10 w-10" />
          </div>
        )}

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
    </motion.div>
  );
}
