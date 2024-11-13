"use client";

import { Link } from "next-view-transitions";
import { Button } from "./ui/button";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselItems = [
  {
    title: "Descubra ofertas incríveis perto de você",
    subtitle: "Economize em suas compras favoritas!",
    backgroundColor: "bg-yellow-400",
    
  },
  {
    title: "Promoções imperdíveis nas suas lojas preferidas",
    subtitle: "Descontos exclusivos, só para você!",
    backgroundColor: "bg-blue-400", 
  },
  {
    title: "Aproveite as melhores ofertas da sua região",
    subtitle: "Compras inteligentes, preços baixos!",
    backgroundColor: "bg-yellow-400",
  },
  {
    title: "Descontos que você não pode perder",
    subtitle: "Compras com qualidade e economia!",
    backgroundColor: "bg-orange-400",
  },
];

export default function BannerCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-full rounded-2xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-full rounded-2xl space-x-2">
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} className="">
            <div
              className={`relative h-56 lg:h-[22rem] rounded-3xl overflow-hidden  ${item.backgroundColor}`}
            >
              <div className="absolute top-0 left-0 flex flex-col justify-center items-center gap-4 sm:gap-12 p-4 sm:p-8 h-full w-full z-10">
                <div className="space-y-3 text-center">
                  <h2 className="text-lg md:text-[32px] font-bold text-foreground drop-shadow-md">
                    {item.title}
                  </h2>

                  <h3 className="text-foreground drop-shadow-md">
                    {item.subtitle}
                  </h3>
                </div>
                <Link href="#category-list">
                  <Button
                    size={"lg"}
                    className="rounded-full  shadow-xl shadow-foreground/20 dark:shadow-none "
                  >
                    Ver Ofertas
                  </Button>
                </Link>
              </div>
            </div>
            
        
          </CarouselItem>
        ))}
      </CarouselContent>
        <CarouselPrevious className="  "/>
        <CarouselNext className="  "/>
    </Carousel>
  );
}
