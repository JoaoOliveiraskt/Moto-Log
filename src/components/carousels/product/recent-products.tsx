import ProductsCarousel from "./products-carousel";
import ProductsCarouselContent from "./products-carousel-content";

export default async function RecentProducts() {
  return (
    <div>
      <ProductsCarousel link="/recent-products" title="Mais recentes">
        <ProductsCarouselContent limit={12} productType="recent" />
      </ProductsCarousel>
    </div>
  );
}
