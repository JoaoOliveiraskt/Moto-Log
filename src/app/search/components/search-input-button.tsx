"use client";

import Icon from "@/components/icons/icon-component";
import SearchDialog from "@/components/search-dialog";
import { Button } from "@/components/ui/button";

interface SearchInputButtonProps {
    searchTerm: string;
}

export default function SearchInputButton({ searchTerm }: SearchInputButtonProps) {
    return (
        <div className="w-full lg:w-80">
            <SearchDialog>
                <Button
                    variant="outline"
                    size="rounded"
                    className="w-full justify-start gap-2 bg-accent/50 hover:bg-accent/80 border-border font-normal text-muted-foreground shadow-none"
                >
                    <Icon.search size={18} className="shrink-0" />
                    <span className="truncate flex-1 text-left">
                        {searchTerm || "O que você procura?"}
                    </span>
                </Button>
            </SearchDialog>
        </div>
    );
}
