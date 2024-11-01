import SeeAllButton from "./see-all-button";
import RecentProductsServer from "./recent-products-server";
import TypographyH3 from "./typography/typography-h3";

export default async function RecentProducts() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH3>Mais recentes</TypographyH3>
        <SeeAllButton href="/recent-products" />
      </div>
      <RecentProductsServer limit={15} />
    </div>
  );
}
