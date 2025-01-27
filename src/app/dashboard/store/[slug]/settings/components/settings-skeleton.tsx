import { Skeleton } from "@/components/ui/skeleton";

const StoreSettingsSkeleton = () => {
  return (
    <main>
      <div className="max-w-4xl">
        <Skeleton className="h-8 w-48 mb-8" />

        <div className="grid gap-8">
          <div className="grid gap-8">
            <div className="grid gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>

          <div className="grid gap-8">
            {/* Banner image skeleton */}
            <div className="grid gap-4">
              <Skeleton className="h-4 w-32" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="w-full max-w-72 h-44 rounded-md" />
                <div className="flex flex-col gap-y-4">
                  <Skeleton className="h-16 w-64" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </div>

            {/* Profile image skeleton */}
            <div className="grid gap-4">
              <Skeleton className="h-4 w-32" />
              <div className="flex flex-wrap gap-4">
                <div className="w-full max-w-72 h-44 rounded-md bg-accent flex items-center justify-center">
                  <Skeleton className="w-36 h-36 rounded-full" />
                </div>
                <div className="flex flex-col gap-y-4">
                  <Skeleton className="h-20 w-64" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </div>
          </div>

          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </main>
  );
};

export default StoreSettingsSkeleton;
