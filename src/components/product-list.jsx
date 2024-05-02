import ProductCard from "./product-card";
import FetchProducts from "../hooks/fetch-products";

export default async function ProductList() {
  const products = await FetchProducts({});

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
