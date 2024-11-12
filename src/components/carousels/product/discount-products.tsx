import ProductsCarousel from "./products-carousel";
import ProductsCarouselContent from "./products-carousel-content";

export default function DiscountProducts() {
  return (
    <div>
      <ProductsCarousel link="/discount" title="Melhores Ofertas">
        <ProductsCarouselContent limit={12} productType="discount" />
      </ProductsCarousel>
    </div>
  );
}
