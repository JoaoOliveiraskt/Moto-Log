"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";

interface SearchResultsTabsProps {
    currentType: string | undefined;
    q: string;
}

export default function SearchResultsTabs({ currentType, q }: SearchResultsTabsProps) {
    const tabs = [
        { label: "Tudo", value: undefined },
        { label: "Lojas", value: "stores" },
        { label: "Produtos", value: "products" },
        { label: "Categorias", value: "categories" },
    ];

    return (
        <div className="border-b border-border sticky top-12 lg:top-14 z-30 bg-background/80 backdrop-blur-md">
            <div className="flex justify-between md:justify-start px-4 gap-2">
                {tabs.map((tab) => {
                    const isActive = currentType === tab.value;
                    const href = tab.value ? `/search/results?q=${q}&type=${tab.value}` : `/search/results?q=${q}`;

                    return (
                        <Link
                            key={tab.label}
                            href={href}
                            replace
                            className={cn(
                                "py-3 text-sm font-medium transition-colors relative px-4",
                                isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30
                                    }}
                                />
                            )}
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
