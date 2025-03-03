import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import FollowButton from "../follow-button";
import { StoreProps } from "@/components/top-stores/types";

interface StoreCardProps {
  store: StoreProps;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <div className="relative ">
      <div className="absolute bottom-3 w-full px-4">
        <FollowButton
          storeId={store.id}
          storeName={store.nome}
          className="rounded-xl w-full lg:!h-9"
          followingClassName="w-full lg:!h-9 rounded-xl border text-muted-foreground !border-none"
        />
      </div>
      <Link href={`/store/${store.id}`} className="block w-full">
        <Card className="bg-card !border-none h-52 rounded-2xl">
          <CardContent className="px-2 py-4">
            <div className="flex flex-col items-center">
              {/* Imagem de perfil */}
              <div className="mb-2 h-20 w-20 overflow-hidden rounded-full bg-muted">
                {store.profileImageUrl ? (
                  <Image
                    src={store.profileImageUrl}
                    alt={store.nome || "Loja"}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xl font-bold text-primary">
                    {store.nome?.charAt(0) || "L"}
                  </div>
                )}
              </div>

              {/* Nome da loja */}
              <h3 className="mb-1 line-clamp-1 text-sm text-center font-bold">
                {store.nome}
              </h3>

              {/* Contadores */}
              <div className="mb-4 flex w-full justify-center gap-2 text-xs text-muted-foreground font-medium">
                <span>
                  {store._count?.followers}{" "}
                  {store._count?.followers === 1 ? "seguidor" : "seguidores"}
                </span>
                <span>
                  {store._count?.Produtos}{" "}
                  {store._count?.Produtos === 1 ? "produto" : "produtos"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
