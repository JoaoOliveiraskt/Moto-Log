import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryCarouselSkeleton() {
  return (
    <CarouselContent className="gap-x-4 mx-4 lg:mx-0">
      {Array.from({ length: 15 }).map((_, index) => (
        <CarouselItem key={index} className="basis-auto p-0">
          <Skeleton key={index} className="h-8 min-w-28 rounded-md" />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}
