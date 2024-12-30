import TypographyH2 from "@/components/typography/typography-h2";
import TypographyP from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  name: string | null;
  description: string | null;
  imageUrl: string | null;
  totalProducts: number | null;
}

export default function StoreInfo({ ...store }: Props) {
  return (
    <div className="space-y-4">
      <div className="w-full h-24 lg:h-52">
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

      <div className="w-full flex items-start gap-x-4 h-20 sm:h-40">
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
            <TypographyH2 className="text-xl lg:text-4xl">
              {store.name}
            </TypographyH2>

            <TypographyP className="text-xs sm:text-sm text-muted-foreground [&:not(:first-child)]:mt-1">
              1999 seguidores • <span>{store.totalProducts} produtos</span>
            </TypographyP>

            <TypographyP className="text-xs sm:text-sm text-muted-foreground max-w-md [&:not(:first-child)]:mt-1 line-clamp-1">
              {store.description}
            </TypographyP>
          </div>
          <Button
            size={"rounded"}
            className="font-semibold px-8 w-fit hidden sm:inline-flex"
          >
            Seguir
          </Button>
        </div>
      </div>
      <Button
        size={"rounded"}
        className="font-semibold px-6 mt-4 sm:hidden w-full "
      >
        Seguir
      </Button>
    </div>
  );
}
