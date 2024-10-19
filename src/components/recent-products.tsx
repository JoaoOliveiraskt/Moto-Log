import SeeAllButton from "./see-all-button";
import RecentProductsServer from "./recent-products-server";

export default async function RecentProducts() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between lg:justify-normal items-center">
        <h2 className="font-bold text-primary text-2xl sm:text-4xl">
          Mais recentes
        </h2>
        <SeeAllButton href="/recent-products" />
      </div>
      <RecentProductsServer limit={15}/>
    </div>
  );
}
