"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Icon from "@/components/icons/icon-component";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import SearchStateDefault from "@/app/search/components/search-state-default";
import SearchStateActive from "@/app/search/components/search-state-active";
import SearchSkeleton from "@/components/search-skeleton";
import { useSearchInitialData, Store, Category } from "@/hooks/use-search-initial-data";

interface SearchDialogProps {
    children?: React.ReactNode;
}

export default function SearchDialog({ children }: SearchDialogProps) {
    const router = useRouter();
    const { data, isLoading: isLoadingInitial } = useSearchInitialData();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState({
        stores: [],
        products: [],
        categories: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Atalho de teclado Ctrl+K / Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);



    const handleSearch = async (term: string) => {
        if (!term) {
            setResults({ stores: [], products: [], categories: [] });
            setIsSearching(false);
            return;
        }

        setIsLoading(true);
        setIsSearching(true);

        try {
            const response = await axios.get(`/api/search?q=${term}`);
            setResults(response.data);
        } catch (error) {
            console.error("Error searching:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (value.length > 0) {
            setIsSearching(true);
            debounceRef.current = setTimeout(() => {
                handleSearch(value);
            }, 400);
        } else {
            setIsSearching(false);
            setResults({ stores: [], products: [], categories: [] });
        }
    };

    const handleClearSearch = () => {
        setQuery("");
        setIsSearching(false);
        setResults({ stores: [], products: [], categories: [] });
        inputRef.current?.focus();
    };

    const handleCancel = () => {
        setQuery("");
        setIsSearching(false);
        setResults({ stores: [], products: [], categories: [] });
        setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.length > 0) {
            setOpen(false);
            router.push(`/search/results?q=${query}`);
        }
    };

    const handleSelect = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="top-0 left-0 w-full h-full max-w-none m-0 p-0 gap-0 rounded-none border-none translate-x-0 translate-y-0 lg:max-w-[51rem] lg:h-[72vh] lg:rounded-3xl lg:border lg:left-[50%] lg:top-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] flex flex-col overflow-hidden [&>button]:hidden">
                <DialogHeader className="px-4 py-4 border-b">
                    <DialogTitle className="sr-only">Pesquisar</DialogTitle>
                    <div className="flex items-center gap-3 w-full">
                        <div className="relative flex-1">
                            <Icon.search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                size={20}
                            />
                            <Input
                                ref={inputRef}
                                value={query}
                                onChange={onInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="O que você procura?"
                                className="pl-10 h-11 rounded-full bg-accent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            {query.length > 0 && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <Icon.x size={16} />
                                </button>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleCancel}
                            className="px-2 hover:bg-transparent hover:text-primary"
                        >
                            Cancelar
                        </Button>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-4">
                    {isLoadingInitial && !data ? (
                        <SearchSkeleton />
                    ) : isSearching ? (
                        isLoading ? (
                            <div className="flex justify-center pt-20">
                                <Icon.loading
                                    className="animate-spin text-muted-foreground"
                                    size={24}
                                />
                            </div>
                        ) : (
                            <SearchStateActive results={results} onSelect={handleSelect} />
                        )
                    ) : (
                        <SearchStateDefault
                            stores={data?.stores ?? []}
                            categories={data?.categories ?? []}
                            products={data?.products ?? []}
                            onSelect={handleSelect}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
