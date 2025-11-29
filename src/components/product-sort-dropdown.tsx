"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ProductSortDropdown() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sort") || "relevance";
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "relevance") {
            params.delete("sort");
        } else {
            params.set("sort", value);
        }

        // Small delay to prevent click-through on mobile
        setTimeout(() => {
            router.push(`?${params.toString()}`);
        }, 100);
    };

    return (
        <Select
            value={currentSort}
            onValueChange={handleSortChange}
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="price_asc">Menor Preço</SelectItem>
                <SelectItem value="price_desc">Maior Preço</SelectItem>
                <SelectItem value="name_asc">Nome (A-Z)</SelectItem>
            </SelectContent>
        </Select>
    );
}
