import SeeAllButton from "./see-all-button";
import TypographyH3 from "./typography/typography-h3";
import DiscountProductsCarousel from "./discount-products-carousel";

export default function DiscountProducts() {
  return (
    <div className="space-y-4 min-w-full">
      <div className="flex justify-between items-center">
        <TypographyH3>Top ofertas</TypographyH3>
        <SeeAllButton href="/discount" />
      </div>
      <DiscountProductsCarousel limit={10} />
    </div>
  );
}
