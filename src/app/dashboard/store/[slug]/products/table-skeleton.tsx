import { Skeleton } from "@/components/ui/skeleton";

export default function ProductTableSkeleton() {
  return (
    <div>
      <div className="w-full flex items-center justify-between mt-6">
        <Skeleton className="w-52 h-10 rounded-full "></Skeleton>
        <Skeleton className="w-10 h-10 rounded-full lg:w-40 "></Skeleton>
      </div>
      <Skeleton className="border min-h-screen rounded-lg mt-4 "></Skeleton>
    </div>
  );
}
