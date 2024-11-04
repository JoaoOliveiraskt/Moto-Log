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
      <CarouselContent className="h-full">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="w-full md:h-fit overflow-hidden p-0 rounded-3xl border bg-card"
          >
            <Image
              src={produto.imagemUrl}
              alt={produto.nome}
              width={800}
              height={500}
              className="object-contain w-full h-full rounded-3xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default ProductBanner;
