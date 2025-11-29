"use client";

import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/icons/icon-component";
import TypographyP from "@/components/typography/typography-p";
import TypographySmall from "@/components/typography/typography-small";
import FollowButton from "@/components/follow-button";

interface StoreCardListItemProps {
    store: {
        id: string;
        nome: string;
        profileImageUrl?: string | null;
        descricao?: string | null;
        _count?: {
            followers: number;
        };
        followers?: number; // For compatibility with search-state-active which might use a different shape
    };
    onClick?: () => void;
}

export default function StoreCardListItem({ store, onClick }: StoreCardListItemProps) {
    const followersCount = store._count?.followers ?? store.followers ?? 0;

    return (
        <div className="group flex items-center gap-4 lg:p-2 rounded-xl lg:hover:bg-card transition-colors">
            <Link
                href={`/store/${store.id}`}
                onClick={onClick}
                className="flex items-center gap-4 flex-1 min-w-0"
            >
                <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden bg-accent border shrink-0">
                    {store.profileImageUrl ? (
                        <Image
                            src={store.profileImageUrl}
                            alt={store.nome}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Icon.store size={20} className="text-muted-foreground" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                    <TypographyP className="truncate font-medium leading-none">
                        {store.nome}
                    </TypographyP>
                    {store.descricao && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                            {store.descricao}
                        </p>
                    )}
                    <TypographySmall className="flex items-center gap-1 text-muted-foreground text-xs mt-0.5">
                        {followersCount} seguidores
                    </TypographySmall>
                </div>
            </Link>
            <FollowButton
                storeId={store.id}
                storeName={store.nome}

            />
        </div>
    );
}
