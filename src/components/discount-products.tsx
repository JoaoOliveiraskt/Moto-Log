import SeeAllButton from "./see-all-button";
import DiscountProductsServer from "./discount-products-server";
import TypographyH3 from "./typography/typography-h3";

export default async function DiscountProducts() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH3>Top ofertas</TypographyH3>
        <SeeAllButton href="/discount" />
      </div>
      <DiscountProductsServer limit={15} />
    </div>
  );
}
