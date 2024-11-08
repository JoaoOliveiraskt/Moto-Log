import ProductsCarousel from "./carousels/products-carousel";

export default async function RecentProducts() {
  return (
    <div>
      <ProductsCarousel
        limit={10}
        link="/recent-products"
        productType="recent"
        title="Mais recentes"
      />
    </div>
  );
}
