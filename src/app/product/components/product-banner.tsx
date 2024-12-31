import Image from "next/image";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductBannerProps {
  images: string[];
  produto: {
    id: string;
    imagemUrl: string;
    nome: string;
  };
  className?: string;
}

const ProductBanner: React.FC<ProductBannerProps> = ({
  images,
  produto,
  className,
}) => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="w-full  gap-x-4">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="h-64 lg:h-80 basis-[94%] sm:basis-auto overflow-hidden p-0 rounded-3xl border bg-card"
          >
            <Image
              src={produto.imagemUrl}
              alt={produto.nome}
              width={600}
              height={600}
              className="object-cover w-full h-full rounded-3xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 hidden lg:inline-flex" />
      <CarouselNext className="right-2 hidden lg:inline-flex" />
    </Carousel>
  );
};

export default ProductBanner;
