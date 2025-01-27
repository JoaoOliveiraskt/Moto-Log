import { Skeleton } from "@/components/ui/skeleton";

export default function TopStoreSkeleton() {
  return (
    <div className="grid grid-cols-5 w-full gap-x-10 gap-y-1.5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center gap-2 max-w-10">
          <Skeleton className="h-14 w-14 rounded-full" />
          <Skeleton className="h-4 w-10" />
        </div>
      ))}
    </div>
  );
}
