import ProductCardSkeleton from "@/components/product-card-skeleton";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";

export function ProductsCarouselSkeleton() {
  return (
    <CarouselContent className="gap-x-2">
      {Array.from({ length: 15 }).map((_, index) => (
        <CarouselItem key={index} className="basis-auto md:p-2">
          <ProductCardSkeleton />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}
