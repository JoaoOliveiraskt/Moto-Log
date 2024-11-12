import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryCarouselSkeleton() {
  return (
    <CarouselContent className="gap-x-4">
      {Array.from({ length: 15 }).map((_, index) => (
        <CarouselItem key={index} className="basis-auto p-0">
          <Skeleton key={index} className="h-11 min-w-28 rounded-full" />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}
