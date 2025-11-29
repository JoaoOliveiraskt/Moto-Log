import SectionHeader from "@/components/section-header";
import StoreCarousel from "@/components/top-stores/store-carousel";
import { getStoresData } from "@/components/top-stores/store-service";

export default async function TopStores() {
  const stores = await getStoresData();

  if (!stores || stores.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="px-4 lg:px-0 lg:pl-2">
        <SectionHeader title="Lojas em destaque" href="/community" />
      </div>
      <StoreCarousel stores={stores} />
    </div>
  );
}
