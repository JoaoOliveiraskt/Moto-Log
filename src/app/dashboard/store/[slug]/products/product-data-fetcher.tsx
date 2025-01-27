import { getProducts } from "@/app/actions/product/get-store-products";
import { ProductsTabs } from "./product-tabs";

export default async function ProductsData({ storeId }: { storeId: string }) {
  const products = await getProducts(storeId);

  const activeProducts = products.filter(
    (product) => product.status === "ATIVO"
  );
  const archivedProducts = products.filter(
    (product) => product.status === "ARQUIVADO"
  );

  return (
    <ProductsTabs
      products={products}
      activeProducts={activeProducts}
      archivedProducts={archivedProducts}
    />
  );
}
