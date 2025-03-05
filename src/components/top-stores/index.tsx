import TypographyH4 from "@/components/typography/typography-h4";
import SeeAllButton from "@/components/see-all-button";
import StoreCarousel from "@/components/top-stores/store-carousel";
import { getStoresData } from "@/components/top-stores/store-service";

export default async function TopStores() {
  const stores = await getStoresData();

  if (!stores || stores.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 pb-6">
      <div className="flex justify-between items-center px-4 lg:px-0 lg:pl-4">
        <TypographyH4>Lojas em destaque</TypographyH4>
        <SeeAllButton href={"/community"} />
      </div>
      <StoreCarousel stores={stores} />
    </div>
  );
}
