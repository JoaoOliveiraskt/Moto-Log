import ProductsCarousel from "./products-carousel";
import ProductsCarouselContent from "./products-carousel-content";

export default function BestSellers() {
  return (
    <div>
      <ProductsCarousel link="/best-sellers" title="Em Alta">
        <ProductsCarouselContent limit={12} productType="bestselling" />
      </ProductsCarousel>
    </div>
  );
}
