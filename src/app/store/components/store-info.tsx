import FollowButton from "@/components/follow-button";
import TypographyH2 from "@/components/typography/typography-h2";
import TypographyP from "@/components/typography/typography-p";
import Image from "next/image";
import StoreAbout from "./store-about";
import TypographySmall from "@/components/typography/typography-small";
import FormatFollowers from "@/app/helpers/format-followers";

interface Props {
  name: string | null;
  description: string | null;
  profileImageUrl: string | null;
  bannerImageUrl: string | null;
  totalProducts: number;
  storeId: string;
  followers: number;
  createdAt: Date;
}

export default function StoreInfo({ ...store }: Props) {
  return (
    <div className="space-y-2 lg:space-y-4">
      {store.bannerImageUrl ? (
        <div className="w-full h-28 lg:h-52 rounded-md lg:rounded-2xl overflow-hidden">
          <Image
            src={store.bannerImageUrl}
            alt="Store Banner"
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      <div className="w-full flex items-center gap-x-4 fit sm:h-40">
        <div>
          {store.profileImageUrl ? (
            <Image
              src={store.profileImageUrl}
              alt="Store Banner"
              width={600}
              height={600}
              className="w-20 h-20 sm:w-40 sm:h-40 object-cover rounded-full flex-shrink-0"
            />
          ) : (
            <div className="w-20 h-20 sm:w-40 sm:h-40 bg-accent rounded-full flex-shrink-0 animate-pulse"></div>
          )}
        </div>

        <div className="flex flex-col justify-between items-start h-full">
          <TypographyH2 className="text-2xl lg:text-4xl line-clamp-2 lg:line-clamp-1">
            {store.name}
          </TypographyH2>

          <div className="flex flex-col gap-y-1 lg:flex-row lg:items-center lg:gap-x-2">
            <p className="text-xs lg:text-sm font-semibold">
              @
              {store.name
                ?.split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join("")}
            </p>

            <div className="flex items-center gap-x-2">
              <FormatFollowers
                followers={store.followers}
                className="sm:text-sm text-muted-foreground"
              />
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <TypographySmall className="sm:text-sm text-muted-foreground">
                {store.totalProducts}{" "}
                {store.totalProducts === 1 ? "produto" : "produtos"}
              </TypographySmall>
            </div>
          </div>

          <div className="hidden sm:flex">
            <StoreAbout {...store} />
          </div>
          <FollowButton
            storeId={store.storeId}
            storeName={store.name}
            className="font-semibold px-8 hidden sm:inline-flex !mt-2"
            followingClassName="hidden sm:inline-flex !mt-2"
          />
        </div>
      </div>
      <div>
        <div className="flex w-full sm:hidden mt-4">
          <StoreAbout {...store} />
        </div>

        <FollowButton
          storeId={store.storeId}
          storeName={store.name}
          className="font-semibold w-full !mt-4 sm:hidden h-10"
          followingClassName="sm:hidden w-full !mt-4 h-10"
        />
      </div>
    </div>
  );
}
