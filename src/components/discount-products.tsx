import ProductsCarousel from "./carousels/products-carousel";

export default function DiscountProducts() {
  return (
    <div>
      <ProductsCarousel
        limit={10}
        link="/discount"
        title="Top Ofertas"
        productType="discount"
      />
    </div>
  );
}
