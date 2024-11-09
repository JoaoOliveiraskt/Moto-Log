import ProductsCarousel from "./products-carousel";

export default async function RecentProducts() {
  return (
    <div>
      <ProductsCarousel
        limit={12}
        link="/recent-products"
        productType="recent"
        title="Mais recentes"
      />
    </div>
  );
}
