import SeeAllButton from "./see-all-button";
import DiscountProductsServer from "./discount-products-server";

export default async function DiscountProducts() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center lg:justify-normal ">
        <h2 className="font-bold text-primary text-2xl sm:text-4xl">
          Com desconto
        </h2>
        <SeeAllButton href="/discount" />
      </div>
      <DiscountProductsServer />
    </div>
  );
}
