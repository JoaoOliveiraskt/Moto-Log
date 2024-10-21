import SeeAllButton from "./see-all-button";
import RecentProductsServer from "./recent-products-server";
import TypographyH2 from "./typography/typography-h2";

export default async function RecentProducts() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <TypographyH2>Mais recentes</TypographyH2>
        <SeeAllButton href="/recent-products" />
      </div>
      <RecentProductsServer limit={15} />
    </div>
  );
}
