import ProductCard from "./product-card";
import FetchProducts from "../hooks/fetch-products";
import { Produto } from "../../prisma/generated/client";

export default async function ProductList() {
  let products: Produto[] = [];
  try {
    products = await FetchProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {products.map((product: Produto) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
