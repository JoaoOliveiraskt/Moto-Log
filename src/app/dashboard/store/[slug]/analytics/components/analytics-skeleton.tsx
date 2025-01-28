import { Skeleton } from "@/components/ui/skeleton";

export function MetricsSkeleton() {
  return (
    <>
      <Skeleton className="h-36 rounded-2xl" />
      <Skeleton className="h-36 rounded-2xl" />
    </>
  );
}

export function StoreStatsSkeleton() {
  return (
    <>
      <Skeleton className="h-36 rounded-2xl" />
      <Skeleton className="h-36 rounded-2xl" />
    </>
  );
}

export function ChartSkeleton() {
  return <Skeleton className="h-[30rem] rounded-2xl xl:col-span-2" />;
}

export function RecentSalesSkeleton() {
  return (
    <div className="space-y-4 mt-4">
      <Skeleton className="h-10 w-1/2 rounded-2xl" />
      <div className="space-y-2">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-14 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
