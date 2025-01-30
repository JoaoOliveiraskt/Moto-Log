"use client";

import { Card } from "../../ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Category {
  id: string;
  nome: string;
}

interface CategoryContent {
  discount: string;
  message: string;
  imageUrl: string;
}

interface CarouselClientProps {
  categories: Category[];
  categoryContent: Record<string, CategoryContent>;
}

export default function CarouselClient({
  categories,
  categoryContent,
}: CarouselClientProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        duration: 14,
      }}
      className="w-full"
      plugins={[Autoplay({ delay: 2000, stopOnMouseEnter: true })]}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {categories.map((category) => {
          const content = categoryContent[category.nome];
          if (!content) return null;

          return (
            <CarouselItem
              key={category.id}
              className="pl-2 md:pl-4 basis-[96%] sm:basis-1/2 lg:basis-1/3"
            >
              <Link
                href={`/category/${category.id}?discount=true`}
                className="group block h-[16rem] relative overflow-hidden rounded-2xl"
              >
                <Card className="h-full relative overflow-hidden border-none">
                  <div className="absolute inset-0">
                    <Image
                      src={content.imageUrl}
                      alt={category.nome}
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-black/0" />
                  </div>

                  <div className="relative h-full p-6 flex flex-col justify-end text-white">
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary px-3 py-1.5 rounded-full text-sm font-bold text-primary-foreground">
                        {content.discount}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{category.nome}</h3>
                      <p className="text-sm text-gray-200">{content.message}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselNext className="hidden lg:inline-flex -right-6" />
      <CarouselPrevious className="hidden lg:inline-flex -left-4" />
    </Carousel>
  );
}
