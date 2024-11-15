import TypographyH3 from "./typography/typography-h3";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { Link } from "next-view-transitions";
import TypographyP from "./typography/typography-p";
import GetStores from "@/app/actions/store/get-stores";

interface StoreProps {
  id: string;
  nome: string;
  imagemUrl: string;
}

async function getStores() {
  try {
    const stores = await GetStores({ limit: 10 });

    if (!stores || stores.length === 0) {
      throw new Error("No stores found");
    }
    return stores;
  } catch (error) {
    return [];
  }
}

export default async function TopStores() {
  const stores = await getStores();

  if (!stores || stores.length === 0) {
    return null;
  }

  return (
    <div className="sm:hidden space-y-4">
      <div className="flex items-center justify-between ">
        <TypographyH3>Top Lojas</TypographyH3>
      </div>
      <div>
        <div className="grid grid-cols-5 w-full gap-x-10 gap-y-1 pl-2 pr-3">
          {stores &&
            stores.map((store: StoreProps) => (
              <div className="w-fit" key={store.id}>
                <Link
                  href={`/store/${store.id}`}
                  className="text-foreground font-medium hover:text-cyan-600 mb-2 flex flex-col items-center gap-1 max-w-10"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    {store.imagemUrl ? (
                      <Image
                        src={store.imagemUrl}
                        width={500}
                        height={500}
                        alt="logo da loja"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <TypographyP className="text-sm md:text-base">
                      {store.nome.split(" ")[0]}
                    </TypographyP>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
