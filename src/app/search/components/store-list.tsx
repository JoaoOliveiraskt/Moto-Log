import React from "react";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "@/components/follow-button";
import TypographyH4 from "@/components/typography/typography-h4";

interface Store {
  id: string;
  nome: string;
  descricao: string;
  profileImageUrl?: string;
  _count: {
    followers: number;
  };
}

interface StoreListProps {
  stores?: Store[];
  title?: string;
}

const StoreList: React.FC<StoreListProps> = ({
  stores = [],
  title = "Lojas",
}) => {
  return (
    <div className="mt-2">
      {/* <TypographyH4 className="mt-8">{title}</TypographyH4> */}
      {stores.map((store) => (
        <div key={store.id} className="flex">
          <Link
            href={`/store/${store.id}`}
            className="flex items-start gap-x-4 py-3 flex-1"
          >
            {store.profileImageUrl ? (
              <Image
                src={store.profileImageUrl}
                alt={store.nome}
                width={48}
                height={48}
                className="rounded-2xl w-12 h-12 mt-1 shrink-0 object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-accent rounded-2xl" />
            )}
            <div className="flex flex-col w-full">
              <h3 className="font-semibold">{store.nome}</h3>
              <p className="text-sm line-clamp-1 text-muted-foreground">
                {store.descricao}
              </p>
              <span className="text-sm">
                {store._count.followers > 999
                  ? `${(store._count.followers / 1000)
                      .toFixed(1)
                      .replace(".", ",")} mil seguidores`
                  : `${store._count.followers} ${
                      store._count.followers <= 1 ? "seguidor" : "seguidores"
                    }`}
              </span>
            </div>
          </Link>
          <div className="py-2 pl-4">
            <FollowButton
              storeId={store.id}
              storeName={store.nome}
              className="rounded-xl w-fit"
              followingClassName="w-fit px-6 rounded-xl bg-transparent border text-muted"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
