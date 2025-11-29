"use client";

import { useEffect, useRef } from "react";

interface InfiniteScrollTriggerProps {
    onIntersect: () => void;
    hasMore: boolean;
    isLoading: boolean;
}

export default function InfiniteScrollTrigger({
    onIntersect,
    hasMore,
    isLoading,
}: InfiniteScrollTriggerProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!hasMore || isLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onIntersect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: "100px" // Start loading a bit before reaching the end
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasMore, isLoading, onIntersect]);

    if (!hasMore) return null;

    return (
        <div
            ref={ref}
            className="h-20 flex items-center justify-center"
        >
            {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Carregando mais produtos...</span>
                </div>
            )}
        </div>
    );
}
