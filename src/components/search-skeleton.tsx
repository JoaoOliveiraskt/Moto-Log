import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchSkeleton() {
    return (
        <div className="space-y-8 pb-20">
            {/* Lojas em alta skeleton */}
            <section>
                <div className="flex items-center justify-between mb-4 px-1">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex gap-x-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 w-20">
                            <Skeleton className="w-20 h-20 rounded-full" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Categorias skeleton */}
            <section>
                <Skeleton className="h-6 w-28 mb-4 px-1" />
                <div className="flex flex-wrap gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-9 w-24 rounded-full" />
                    ))}
                </div>
            </section>

            {/* Produtos skeleton */}
            <section>
                <Skeleton className="h-6 w-32 mb-4 px-1" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-2 lg:gap-x-0">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="w-full aspect-square rounded-3xl" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
