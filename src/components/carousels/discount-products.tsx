import ProductsCarousel from "./products-carousel";

export default function DiscountProducts() {
  return (
    <div>
      <ProductsCarousel
        limit={12}
        link="/discount"
        title="Top Ofertas"
        productType="discount"
      />
    </div>
  );
}
