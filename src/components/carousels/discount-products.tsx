import ProductsCarousel from "./products-carousel";

export default function DiscountProducts() {
  return (
    <div>
      <ProductsCarousel
        limit={12}
        link="/discount"
        title="Melhores Ofertas"
        productType="discount"
      />
    </div>
  );
}
