import ProductsCarousel from "./products-carousel";

export default function BestSellers() {
  return (
    <div>
      <ProductsCarousel
        limit={12}
        link="/best-sellers"
        title="Em Alta"
        productType="bestselling"
      />
    </div>
  );
}
