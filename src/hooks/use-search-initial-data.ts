import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/app/types/product";

export interface Store {
    id: string;
    nome: string;
    profileImageUrl?: string;
    _count?: {
        followers: number;
    };
}

export interface Category {
    id: string;
    nome: string;
}

export interface SearchInitialData {
    stores: Store[];
    categories: Category[];
    products: Product[];
}

const fetchSearchInitialData = async (): Promise<SearchInitialData> => {
    const response = await fetch("/api/search/initial");
    if (!response.ok) throw new Error("Failed to fetch search data");
    return response.json();
};

export const useSearchInitialData = () => {
    return useQuery({
        queryKey: ["searchInitialData"],
        queryFn: fetchSearchInitialData,
        staleTime: 60 * 60 * 1000, // 1 hour
        gcTime: 60 * 60 * 1000, // 1 hour (formerly cacheTime)
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};
