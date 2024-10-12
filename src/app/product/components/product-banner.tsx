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
    <Carousel className="rounded-xl">
      <CarouselContent className="">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="w-full md:h-[440px] overflow-hidden p-0 rounded-xl border"
          >
            <Image
              src={produto.imagemUrl}
              alt={produto.nome}
              width={600}
              height={400}
              className="object-cover w-full h-full"
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
