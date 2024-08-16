import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
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
    <Carousel className="h-fit mx-6">
      <CarouselContent className="relative w-fit">
        <CarouselItem className="w-max h-[400px] overflow-hidden p-0 rounded-md">
          <Image
            src={produto.imagemUrl}
            alt={produto.nome}
            width={600}
            height={400}
            className="object-cover w-full h-full"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="z-20 left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default ProductBanner;
