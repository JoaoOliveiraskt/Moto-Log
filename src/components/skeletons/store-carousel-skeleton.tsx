import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export function StoreCarouselSkeleton() {
  return (
    <CarouselContent className="-ml-2 md:-ml-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <CarouselItem
          key={index}
          className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
        >
          <Skeleton className="h-60 sm:h-72 w-full rounded-3xl" />
          <div className="flex items-center gap-2 mt-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  )
} 