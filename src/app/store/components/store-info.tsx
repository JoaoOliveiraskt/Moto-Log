import FollowButton from "@/components/follow-button";
import TypographyH2 from "@/components/typography/typography-h2";
import TypographyP from "@/components/typography/typography-p";
import Image from "next/image";

interface Props {
  name: string | null;
  description: string | null;
  imageUrl: string | null;
  totalProducts: number | null;
  storeId: string;
  followers: number;
}

export default function StoreInfo({ ...store }: Props) {
  return (
    <div className="space-y-4">
      <div className="w-full h-28 lg:h-52">
        {store.imageUrl ? (
          <Image
            src={store.imageUrl}
            alt="Store Banner"
            width={600}
            height={600}
            className="w-full h-full object-cover rounded-lg lg:rounded-2xl shadow-lg"
          />
        ) : null}
      </div>

      <div className="w-full flex items-center gap-x-4 fit sm:h-40">
        <div>
          {store.imageUrl ? (
            <Image
              src={store.imageUrl}
              alt="Store Banner"
              width={600}
              height={600}
              className="w-20 h-20 sm:w-40 sm:h-40 object-cover rounded-full flex-shrink-0 shadow-xl"
            />
          ) : (
            <div className="w-20 h-20 sm:w-40 sm:h-40 bg-accent rounded-full flex-shrink-0 animate-pulse"></div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between h-full">
          <div className="flex-1">
            <TypographyH2 className="text-xl lg:text-4xl line-clamp-2 lg:line-clamp-1">
              {store.name}
            </TypographyH2>

            <div className="flex items-center gap-x-2 mt-2">
              <TypographyP className="text-xs sm:text-sm text-muted-foreground [&:not(:first-child)]:mt-0">
                {store.followers > 999
                  ? `${(store.followers / 1000)
                      .toFixed(1)
                      .replace(".", ",")} mil seguidores`
                  : `${store.followers} ${
                      store.followers <= 1 ? "seguidor" : "seguidores"
                    }`}
              </TypographyP>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <TypographyP className="text-xs sm:text-sm text-muted-foreground [&:not(:first-child)]:mt-0">
                {store.totalProducts}{" "}
                {store.totalProducts === 1 ? "produto" : "produtos"}
              </TypographyP>
            </div>

            <TypographyP className="text-xs sm:text-sm text-muted-foreground max-w-md [&:not(:first-child)]:mt-1 line-clamp-1">
              {store.description}
            </TypographyP>
          </div>
          <FollowButton
            storeId={store.storeId}
            storeName={store.name}
            className="font-semibold px-8 hidden sm:inline-flex"
          />
        </div>
      </div>
      <FollowButton
        storeId={store.storeId}
        storeName={store.name}
        className="font-semibold w-full mt-4 sm:hidden"
      />
    </div>
  );
}
