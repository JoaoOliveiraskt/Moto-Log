import Image from "next/image";
import { Link } from "next-view-transitions";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "../ui/carousel";

interface Promotion {
  discount: number;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  link: string;
}

interface PromotionsCarouselProps {
  promotions: Promotion[];
}

export default function PromotionsCarousel({ promotions }: PromotionsCarouselProps) {
  return (
    <Carousel
      opts={{
        dragFree: true,
        duration: 20,
        containScroll: "trimSnaps",
        align: "start",
        slidesToScroll: "auto",
      }}
    >
      <CarouselContent className="flex gap-4">
        {promotions.map((promo, index) => (
          <div key={index} className="relative w-80 h-64 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={promo.imageSrc}
              alt={`Promoção de ${promo.category}`}
              layout="fill"
              objectFit="cover"
              className="opacity-80"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-xl font-bold mb-2">{promo.title}</h2>
              <p className="text-sm mb-4">{promo.description}</p>
              <span className="text-lg font-semibold">{promo.discount}% off</span>
              <Link href={promo.link}>
                <a className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Ver todos os {promo.category}
                </a>
              </Link>
            </div>
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  );
} 