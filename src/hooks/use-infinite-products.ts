"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

interface Product {
    id: string;
    nome: string;
    imagemUrl: string;
    preco: number;
    porcentagemDesconto: number;
    totalVendido: number;
    categoria: {
        nome: string;
    };
    loja: {
        id: string;
        nome: string;
        profileImageUrl: string | null;
        descricao?: string;
    };
}

interface SearchResponse {
    products: Product[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        hasMore: boolean;
    };
}

export function useInfiniteProducts(query: string, sort: string = "relevance") {
    return useInfiniteQuery<SearchResponse>({
        queryKey: ["infinite-products", query, sort],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams({
                q: query,
                type: "products",
                page: String(pageParam),
                pageSize: "20",
            });

            const res = await fetch(`/api/search?${params.toString()}`);

            if (!res.ok) {
                throw new Error("Failed to fetch products");
            }

            return res.json();
        },
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasMore
                ? lastPage.pagination.page + 1
                : undefined;
        },
        initialPageParam: 1,
        enabled: !!query, // Only run if query exists
    });
}
