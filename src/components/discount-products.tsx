import SeeAllButton from "./see-all-button";
import DiscountProductsServer from "./discount-products-server";
import TypographyH2 from "./typography/typography-h2";

export default async function DiscountProducts() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <TypographyH2>Top ofertas</TypographyH2>
        <SeeAllButton href="/discount" />
      </div>
      <DiscountProductsServer limit={15} />
    </div>
  );
}
