import { Skeleton } from "@/components/ui/skeleton";

interface SearchResultsSkeletonProps {
    type?: string;
}

export default function SearchResultsSkeleton({ type }: SearchResultsSkeletonProps) {
    const showStores = !type || type === "stores";
    const showCategories = !type || type === "categories";
    const showProducts = !type || type === "products";
    const showTitles = !type;

    return (
        <div className="space-y-8">
            {/* Stores Skeleton */}
            {showStores && (
                <section className="space-y-4">
                    {showTitles && <Skeleton className="h-6 w-24" />}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 lg:p-2 rounded-xl border-transparent">
                                <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                                <div className="flex-1 space-y-2 min-w-0">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="w-20 h-8 rounded-md" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Categories Skeleton */}
            {showCategories && (
                <section className="space-y-4">
                    {showTitles && <Skeleton className="h-6 w-32" />}
                    <div className="flex flex-wrap gap-2">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-9 w-24 rounded-full" />
                        ))}
                    </div>
                </section>
            )}

            {/* Products Skeleton */}
            {showProducts && (
                <section className="space-y-4">
                    {showTitles && <Skeleton className="h-6 w-28" />}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="aspect-square rounded-2xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
